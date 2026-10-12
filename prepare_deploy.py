#!/usr/bin/env python3
"""Generate production SEO metadata only after a verified domain is provided."""
import sys, re, html
from pathlib import Path
from urllib.parse import urlparse
if len(sys.argv)!=2: raise SystemExit("Usage: python3 prepare_deploy.py https://your-real-domain.com")
base=sys.argv[1].rstrip('/')
u=urlparse(base)
if u.scheme!='https' or not u.netloc or 'example' in u.netloc or 'YOUR-' in base: raise SystemExit('Supply a real HTTPS production domain')
root=Path(__file__).resolve().parent
for name in ('index.html','privacy.html','terms.html','disclaimer.html'):
 p=root/name;s=p.read_text();url=base+'/'+('' if name=='index.html' else name)
 s=re.sub(r'<link rel="canonical"[^>]*>', '',s)
 s=s.replace('</head>',f'<link rel="canonical" href="{html.escape(url,quote=True)}"></head>')
 if name=='index.html':s=s.replace('content="./logo-transparent.png"','content="'+html.escape(base+'/logo-transparent.png',quote=True)+'"')
 p.write_text(s)
(root/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{html.escape(base+path)}</loc></url>\n' for path in ('/','/privacy.html','/terms.html','/disclaimer.html'))+'</urlset>\n')
(root/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n')
print('Production metadata and sitemap generated for',base)
