import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { GalleryItem } from '../types';

interface ThreeCarouselProps {
  items: GalleryItem[];
  activeCategory: string;
  onItemClick: (item: GalleryItem) => void;
}

interface TooltipState {
  title: string;
  category: string;
  x: number;
  y: number;
}

const RADIUS = 5.5;
const CARD_W = 2.4;
const CARD_H = 1.8;
const AUTO_ROTATE_SPEED = 0.003;

export default function ThreeCarousel({ items, activeCategory, onItemClick }: ThreeCarouselProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeCategoryRef = useRef(activeCategory);
  const onItemClickRef = useRef(onItemClick);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => { activeCategoryRef.current = activeCategory; }, [activeCategory]);
  useEffect(() => { onItemClickRef.current = onItemClick; }, [onItemClick]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight || 600;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 0.8, 9);
    camera.lookAt(0, 0, 0);

    // Subtle fog
    scene.fog = new THREE.FogExp2(0x0d0d0d, 0.045);

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const goldLight = new THREE.PointLight(0xd4af37, 1.2, 20);
    goldLight.position.set(0, 4, 2);
    scene.add(goldLight);

    // ── Carousel group ────────────────────────────────────────────────────
    const carousel = new THREE.Group();
    scene.add(carousel);

    // ── Background particles ──────────────────────────────────────────────
    const particleCount = 120;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 30;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.04, transparent: true, opacity: 0.35 });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // ── Ground ring ───────────────────────────────────────────────────────
    const ringGeo = new THREE.RingGeometry(RADIUS - 0.1, RADIUS + 0.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.08, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.2;
    scene.add(ring);

    // ── Cards ─────────────────────────────────────────────────────────────
    const meshes: THREE.Mesh[] = [];
    const borderMeshes: THREE.Mesh[] = [];
    const loader = new THREE.TextureLoader();
    const N = items.length;

    items.forEach((item, i) => {
      const angle = (i / N) * Math.PI * 2;
      const x = RADIUS * Math.sin(angle);
      const z = RADIUS * Math.cos(angle);

      // Border (child of card, slightly behind)
      const borderGeo = new THREE.PlaneGeometry(CARD_W + 0.1, CARD_H + 0.1);
      const borderMat = new THREE.MeshBasicMaterial({
        color: 0x222222,
        transparent: true,
        opacity: 0.7,
      });
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.z = -0.002; // behind the card in local space
      borderMesh.userData = { index: i };

      // Image card
      const cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H);
      const cardMat = new THREE.MeshBasicMaterial({
        color: 0x2a2a2a,
        transparent: true,
        opacity: 1.0,
      });
      const mesh = new THREE.Mesh(cardGeo, cardMat);
      mesh.position.set(x, 0, z);
      mesh.lookAt(0, 0, 0);
      mesh.add(borderMesh); // border is a child
      mesh.userData = { item, index: i, angle };

      carousel.add(mesh);
      meshes.push(mesh);
      borderMeshes.push(borderMesh);

      loader.load(
        item.imageUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          cardMat.map = texture;
          cardMat.color.set(0xffffff);
          cardMat.needsUpdate = true;
        },
      );
    });

    // ── Interaction state ─────────────────────────────────────────────────
    let isDragging = false;
    let dragStartX = 0;
    let prevDragX = 0;
    let velocity = 0;
    let targetRot = 0;
    let currentRot = 0;
    let hoveredMesh: THREE.Mesh | null = null;
    let hasDragged = false;
    let animId: number;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // ── Animation loop ────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        velocity *= 0.92;
        if (Math.abs(velocity) < 0.00005) velocity = 0;
        targetRot += velocity + AUTO_ROTATE_SPEED * delta * 60;
      }
      currentRot += (targetRot - currentRot) * 0.07;
      carousel.rotation.y = currentRot;

      // Pulse the gold light gently
      goldLight.intensity = 1.2 + Math.sin(clock.getElapsedTime() * 0.8) * 0.3;

      meshes.forEach((mesh, i) => {
        const item = mesh.userData.item as GalleryItem;
        const cat = activeCategoryRef.current;
        const isActive = cat === 'All' || item.category === cat;
        const isHovered = mesh === hoveredMesh;

        const cardMat = mesh.material as THREE.MeshBasicMaterial;
        const targetOpacity = isActive ? 1.0 : 0.1;
        cardMat.opacity += (targetOpacity - cardMat.opacity) * 0.08;

        const borderMat = borderMeshes[i].material as THREE.MeshBasicMaterial;
        if (isHovered && isActive) {
          borderMat.color.setHex(0xd4af37);
          borderMat.opacity += (1.0 - borderMat.opacity) * 0.15;
        } else {
          borderMat.color.setHex(0x222222);
          borderMat.opacity += ((isActive ? 0.7 : 0.05) - borderMat.opacity) * 0.1;
        }

        const targetScale = isHovered && isActive ? 1.07 : 1.0;
        mesh.scale.x += (targetScale - mesh.scale.x) * 0.1;
        mesh.scale.y += (targetScale - mesh.scale.y) * 0.1;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Helpers ───────────────────────────────────────────────────────────
    const getPointer = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      return {
        ndcX: ((clientX - rect.left) / rect.width) * 2 - 1,
        ndcY: -((clientY - rect.top) / rect.height) * 2 + 1,
        localX: clientX - rect.left,
        localY: clientY - rect.top,
      };
    };

    const updateHover = (clientX: number, clientY: number) => {
      const { ndcX, ndcY, localX, localY } = getPointer(clientX, clientY);
      pointer.set(ndcX, ndcY);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(meshes);
      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const item = hit.userData.item as GalleryItem;
        const cat = activeCategoryRef.current;
        if (cat === 'All' || item.category === cat) {
          hoveredMesh = hit;
          mount.style.cursor = 'pointer';
          setTooltip({ title: item.title, category: item.category, x: localX, y: localY });
          return;
        }
      }
      hoveredMesh = null;
      mount.style.cursor = 'default';
      setTooltip(null);
    };

    // ── Mouse events ──────────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      hasDragged = false;
      dragStartX = e.clientX;
      prevDragX = e.clientX;
      velocity = 0;
      mount.style.cursor = 'grabbing';
      setTooltip(null);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevDragX;
        if (Math.abs(e.clientX - dragStartX) > 4) hasDragged = true;
        velocity = dx * 0.007;
        targetRot += velocity;
        prevDragX = e.clientX;
        hoveredMesh = null;
      } else {
        updateHover(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      mount.style.cursor = hoveredMesh ? 'pointer' : 'default';
    };

    const onMouseLeave = () => {
      isDragging = false;
      hoveredMesh = null;
      setTooltip(null);
      mount.style.cursor = 'default';
    };

    const onClick = (e: MouseEvent) => {
      if (hasDragged) return;
      const { ndcX, ndcY } = getPointer(e.clientX, e.clientY);
      pointer.set(ndcX, ndcY);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(meshes);
      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const item = hit.userData.item as GalleryItem;
        const cat = activeCategoryRef.current;
        if (cat === 'All' || item.category === cat) {
          onItemClickRef.current(item);
        }
      }
    };

    // ── Touch events ──────────────────────────────────────────────────────
    let prevTouchX = 0;

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      hasDragged = false;
      dragStartX = e.touches[0].clientX;
      prevTouchX = e.touches[0].clientX;
      velocity = 0;
      setTooltip(null);
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - prevTouchX;
      if (Math.abs(e.touches[0].clientX - dragStartX) > 4) hasDragged = true;
      velocity = dx * 0.007;
      targetRot += velocity;
      prevTouchX = e.touches[0].clientX;
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      isDragging = false;
      if (!hasDragged && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        const { ndcX, ndcY } = getPointer(t.clientX, t.clientY);
        pointer.set(ndcX, ndcY);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(meshes);
        if (hits.length > 0) {
          const hit = hits[0].object as THREE.Mesh;
          const item = hit.userData.item as GalleryItem;
          const cat = activeCategoryRef.current;
          if (cat === 'All' || item.category === cat) {
            onItemClickRef.current(item);
          }
        }
      }
    };

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const rw = mount.clientWidth;
      const rh = mount.clientHeight || 600;
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setSize(rw, rh);
    };

    // ── Bind events ───────────────────────────────────────────────────────
    mount.addEventListener('mousedown', onMouseDown);
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseup', onMouseUp);
    mount.addEventListener('mouseleave', onMouseLeave);
    mount.addEventListener('click', onClick);
    mount.addEventListener('touchstart', onTouchStart, { passive: true });
    mount.addEventListener('touchmove', onTouchMove, { passive: false });
    mount.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousedown', onMouseDown);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseup', onMouseUp);
      mount.removeEventListener('mouseleave', onMouseLeave);
      mount.removeEventListener('click', onClick);
      mount.removeEventListener('touchstart', onTouchStart);
      mount.removeEventListener('touchmove', onTouchMove);
      mount.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      borderMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.MeshBasicMaterial).dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [items]); // Only re-init when items change; category handled via ref

  return (
    <div className="relative w-full" style={{ height: '580px' }}>
      <div ref={mountRef} className="w-full h-full rounded-sm" />

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 bg-obsidian/95 border border-gold/40 px-3 py-2 rounded-sm text-warm-white text-sm shadow-lg"
          style={{
            left: Math.min(tooltip.x + 18, (mountRef.current?.clientWidth ?? 600) - 160),
            top: tooltip.y - 44,
          }}
        >
          <div className="text-gold text-[10px] uppercase tracking-[0.25em] font-light">{tooltip.category}</div>
          <div className="font-medium mt-0.5 text-warm-white/90">{tooltip.title}</div>
          <div className="text-warm-white/30 text-[10px] mt-1">Click to view</div>
        </div>
      )}

      {/* Drag hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-warm-white/20 text-[10px] tracking-widest uppercase pointer-events-none select-none">
        <span>←</span>
        <span>Drag to rotate</span>
        <span>→</span>
      </div>
    </div>
  );
}
