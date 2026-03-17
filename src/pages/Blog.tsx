import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { LandingFooter } from '@/components/landing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-copy-paste-between-devices-online',
    title: 'How to Copy & Paste Between Devices Online (2026 Guide)',
    description: 'Learn how to seamlessly copy and paste text, code, and images between your phone, tablet, and computer using a free online clipboard tool.',
    date: '2026-03-15',
    readTime: '6 min',
    tags: ['Guide', 'Cross-Device'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  },
  {
    slug: 'best-free-online-clipboard-tool-2026',
    title: 'Best Free Online Clipboard Tool in 2026 — Full Review',
    description: 'Discover the best free online clipboard tools of 2026. Compare features like password protection, auto-expiry, code support, and cross-device sync.',
    date: '2026-03-14',
    readTime: '8 min',
    tags: ['Review', 'Tools'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    slug: 'secure-online-clipboard-with-password-protection',
    title: 'Secure Online Clipboard with Password Protection — Why It Matters',
    description: 'Why password-protected clipboards are essential for sharing sensitive data online. Learn how to secure your clips with encryption and passwords.',
    date: '2026-03-13',
    readTime: '5 min',
    tags: ['Security', 'Privacy'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  },
  {
    slug: 'online-clipboard-with-auto-expiry',
    title: 'Online Clipboard with Auto Expiry — Keep Your Data Safe',
    description: 'Learn how auto-expiring clips help protect your privacy and keep your clipboard clean. Set custom expiry times for sensitive content.',
    date: '2026-03-12',
    readTime: '5 min',
    tags: ['Privacy', 'Features'],
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80',
  },
  {
    slug: 'share-code-snippets-online-free',
    title: 'Share Code Snippets Online for Free — Developer Guide',
    description: 'The ultimate guide for developers to share code snippets online with syntax highlighting, password protection, and instant link sharing.',
    date: '2026-03-11',
    readTime: '7 min',
    tags: ['Developer', 'Code'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
  },
  {
    slug: 'online-clipboard-vs-pastebin',
    title: 'Online Clipboard vs Pastebin — Which Is Better in 2026?',
    description: 'A detailed comparison of Online Clipboard and Pastebin. Compare features, security, pricing, and user experience to find the best tool.',
    date: '2026-03-10',
    readTime: '9 min',
    tags: ['Comparison', 'Review'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'save-text-online-and-access-anywhere',
    title: 'Save Text Online and Access It Anywhere — Complete Guide',
    description: 'How to save text, notes, and snippets online and access them from any device. No app installation needed — works directly in your browser.',
    date: '2026-03-09',
    readTime: '5 min',
    tags: ['Guide', 'Productivity'],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
  },
  {
    slug: 'clipboard-sync-across-devices-free',
    title: 'Clipboard Sync Across Devices for Free — How It Works',
    description: 'Sync your clipboard across phone, tablet, and desktop for free. No software required — just your browser and an internet connection.',
    date: '2026-03-08',
    readTime: '6 min',
    tags: ['Sync', 'Free'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    slug: 'online-clipboard-for-developers',
    title: 'Online Clipboard for Developers — Essential Workflow Tool',
    description: 'Why developers love using online clipboard tools. Syntax highlighting, API snippets, config sharing, and team collaboration features.',
    date: '2026-03-07',
    readTime: '7 min',
    tags: ['Developer', 'Workflow'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  },
  {
    slug: 'copy-paste-from-phone-to-computer-online',
    title: 'Copy Paste from Phone to Computer Online — Easy Method',
    description: 'The easiest way to copy and paste between your phone and computer without any app. Works on iPhone, Android, Windows, and Mac.',
    date: '2026-03-06',
    readTime: '5 min',
    tags: ['Mobile', 'Guide'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    slug: 'why-you-need-an-online-clipboard-in-2026',
    title: 'Why You Need an Online Clipboard in 2026 — Top 10 Reasons',
    description: 'Discover the top 10 reasons why an online clipboard is a must-have productivity tool in 2026. From remote work to coding — it helps everywhere.',
    date: '2026-03-05',
    readTime: '6 min',
    tags: ['Productivity', 'Tips'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
  },
  {
    slug: 'online-clipboard-privacy-tips',
    title: 'Online Clipboard Privacy Tips — Protect Your Shared Data',
    description: 'Essential privacy tips when using online clipboard tools. Learn about encryption, password protection, auto-expiry, and safe sharing practices.',
    date: '2026-03-04',
    readTime: '5 min',
    tags: ['Privacy', 'Tips'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
];

const Blog: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <SEO
        title="Online Clipboard Blog — Tips, Guides & Comparisons 2026"
        description="Read expert articles on online clipboard tools, cross-device copy paste, code sharing, security tips, and productivity guides. Updated for 2026."
        canonical="https://onlineclipboard.pro/blog"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onlineclipboard.pro" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://onlineclipboard.pro/blog" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Online Clipboard Blog Articles",
          "itemListElement": blogPosts.map((post, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": post.title,
            "url": `https://onlineclipboard.pro/blog/${post.slug}`
          }))
        })}</script>
      </Helmet>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Online Clipboard Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guides, comparisons, and tips on clipboard tools, cross-device sync, code sharing, and online productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <Card className="overflow-hidden h-full border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={`${post.title} — Online Clipboard Blog`}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                  <div className="flex items-center text-primary text-sm font-medium gap-1 pt-1">
                    Read more <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Blog;
