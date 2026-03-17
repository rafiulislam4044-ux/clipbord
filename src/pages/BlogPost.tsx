import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/components/layout/SEO';
import { Header } from '@/components/layout/Header';
import { LandingFooter } from '@/components/landing/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Clock, ArrowLeft, ArrowRight, User, ChevronRight, ExternalLink } from 'lucide-react';
import { blogPosts } from './Blog';
import { blogArticles } from '@/data/blogArticles';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const article = slug ? blogArticles[slug] : null;

  if (!post || !article) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Get related posts by matching tags
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 4);
  const fallbackRelated = relatedPosts.length < 4
    ? [...relatedPosts, ...blogPosts.filter((p) => p.slug !== slug && !relatedPosts.includes(p)).slice(0, 4 - relatedPosts.length)]
    : relatedPosts;

  return (
    <div className="bg-background min-h-screen">
      <SEO
        title={post.title}
        description={post.description}
        canonical={`https://onlineclipboard.pro/blog/${post.slug}`}
        ogImage={post.image}
      />
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Online Clipboard Team" />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.description,
          "image": post.image,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": { "@type": "Organization", "name": "Online Clipboard", "url": "https://onlineclipboard.pro" },
          "publisher": { "@type": "Organization", "name": "Online Clipboard", "logo": { "@type": "ImageObject", "url": "https://onlineclipboard.pro/favicon.png" } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://onlineclipboard.pro/blog/${post.slug}` },
          "wordCount": article.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
          "keywords": post.tags.join(', ')
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onlineclipboard.pro" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://onlineclipboard.pro/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://onlineclipboard.pro/blog/${post.slug}` }
          ]
        })}</script>
      </Helmet>
      <Header />

      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px] md:max-w-none">{post.title}</span>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-medium">{tag}</Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-5 leading-tight">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> Online Clipboard Team
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> Published {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readTime} read
          </span>
        </div>

        {/* Summary box */}
        <div className="bg-muted/40 border border-border rounded-lg p-4 md:p-5 mb-8">
          <p className="text-sm font-medium text-foreground mb-1">📋 Quick Summary</p>
          <p className="text-sm text-muted-foreground">{post.description}</p>
        </div>

        {/* Hero image */}
        <figure className="mb-10">
          <img
            src={post.image}
            alt={`${post.title} — Online Clipboard Blog`}
            width={800}
            height={450}
            className="w-full rounded-xl aspect-video object-cover shadow-md"
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center italic">
            {post.title} — Online Clipboard Blog
          </figcaption>
        </figure>

        {/* Table of Contents */}
        {article.toc && article.toc.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-5 mb-10">
            <h2 className="text-base font-bold text-foreground mb-3">📑 Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-1.5">
              {article.toc.map((item, i) => (
                <li key={i}>
                  <a href={`#section-${i}`} className="text-sm text-primary hover:underline">{item}</a>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Article body */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12
            prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4
            prose-h2:text-2xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2
            prose-h3:text-xl
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80
            prose-strong:text-foreground prose-strong:font-semibold
            prose-li:text-muted-foreground prose-li:mb-1
            prose-ul:my-4 prose-ol:my-4
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-table:border-collapse prose-table:w-full
            prose-th:bg-muted prose-th:text-foreground prose-th:font-semibold prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-border
            prose-td:p-3 prose-td:border prose-td:border-border prose-td:text-muted-foreground
            prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Separator className="my-10" />

        {/* Key Takeaways */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 md:p-6 mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              {article.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-bold mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ Section */}
        {article.faq && article.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-5">❓ Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {article.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-foreground font-medium hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <Separator className="my-10" />

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-center mb-10">
          <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Try Online Clipboard?</h3>
          <p className="text-muted-foreground mb-5 max-w-md mx-auto">
            Save text, code, images & links with password protection and auto-expiry. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started Free →</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/blog">Read More Articles</Link>
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mb-10">
          <h3 className="text-xl font-bold text-foreground mb-5">📖 Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fallbackRelated.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                <Card className="overflow-hidden h-full border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md">
                  <div className="flex gap-3 p-4">
                    <img
                      src={p.image}
                      alt={`${p.title} — Online Clipboard`}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {p.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                      <span className="text-xs text-primary mt-1 inline-flex items-center gap-1">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* External Resources */}
        {article.externalResources && article.externalResources.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-bold text-foreground mb-3">🔗 External Resources</h3>
            <div className="space-y-2">
              {article.externalResources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3 shrink-0" /> {res.title}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Prev/Next Navigation */}
        <div className="flex justify-between items-stretch gap-4 border-t border-border pt-6">
          {prevPost ? (
            <Link to={`/blog/${prevPost.slug}`} className="flex-1 group p-4 rounded-lg border border-border hover:border-primary/40 transition-colors">
              <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><ArrowLeft className="h-3 w-3" /> Previous Article</span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{prevPost.title}</span>
            </Link>
          ) : <div className="flex-1" />}
          {nextPost ? (
            <Link to={`/blog/${nextPost.slug}`} className="flex-1 group p-4 rounded-lg border border-border hover:border-primary/40 transition-colors text-right">
              <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1">Next Article <ArrowRight className="h-3 w-3" /></span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{nextPost.title}</span>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </article>
      <LandingFooter />
    </div>
  );
};

export default BlogPost;
