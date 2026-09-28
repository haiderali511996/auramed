'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiTruck, FiShield, FiHeadphones, FiArrowUpRight } from 'react-icons/fi';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import HeroSlider from '@/components/HeroSlider';

export default function HomeClient() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products', { params: { featured: true, limit: 8 } }),
        ]);
        if (!cancelled) {
          setCategories(catRes.data || []);
          setFeatured(prodRes.data?.products || []);
        }
      } catch (e) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <HeroSlider />

      <section className="section container">
        <div className="section-header">
          <span className="eyebrow">FIND YOUR EVERYDAY ESSENTIALS</span><h2>Care, in every category.</h2>
          <p>Explore our range of pharmaceutical and wellness products.</p>
        </div>
        {loading ? (
          <div className="state-box"><div className="spinner" /></div>
        ) : error || categories.length === 0 ? (
          <div className="state-box"><p>{error ? "Categories are temporarily unavailable." : "Our collection is growing. Explore the shop for available products."}</p><Link href="/shop" className="btn btn-outline">Explore the shop</Link></div>
        ) : (
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat._id} href={`/shop?category=${cat.slug}`} className="category-card">
                {cat.icon?.startsWith('http') || cat.icon?.startsWith('/uploads') ? (
                  <img src={cat.icon} alt={cat.name} className="category-icon-img" />
                ) : (
                  <span className="category-icon">{cat.icon}</span>
                )}
                <h3>{cat.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="section container">
        <div className="section-header">
          <span className="eyebrow">THE AURAMED EDIT</span><h2>Make room for feeling good.</h2>
          <p>Handpicked essentials trusted by our customers.</p>
        </div>
        {loading ? (
          <div className="state-box"><div className="spinner" /></div>
        ) : error || featured.length === 0 ? (
          <div className="state-box">
            <h3>No featured products right now</h3>
            <p>Check back soon, or browse the full shop.</p>
            <Link href="/shop" className="btn btn-primary mt-2">Browse Shop</Link>
          </div>
        ) : (
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="container editorial-banner">
        <div><span className="eyebrow">HERE FOR YOUR EVERYDAY</span><h2>Your wellbeing.<br />Our reason why.</h2><p>From the essentials you rely on to the routines you love.</p></div>
        <Link href="/contact" className="btn btn-outline">Let’s talk care <FiArrowUpRight /></Link>
      </section>
      <section className="section service-strip">
        <div className="container category-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="text-center">
            <FiTruck size={30} color="var(--primary)" />
            <h3 style={{ fontSize: '1rem', marginTop: 10 }}>Fast Delivery</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Quick delivery across Pakistan.</p>
          </div>
          <div className="text-center">
            <FiShield size={30} color="var(--primary)" />
            <h3 style={{ fontSize: '1rem', marginTop: 10 }}>100% Genuine</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Authentic, quality-checked products only.</p>
          </div>
          <div className="text-center">
            <FiHeadphones size={30} color="var(--primary)" />
            <h3 style={{ fontSize: '1rem', marginTop: 10 }}>Friendly Support</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Our team is here to help, every day.</p>
          </div>
        </div>
      </section>
    </>
  );
}
