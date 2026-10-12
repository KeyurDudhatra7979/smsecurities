# S.M. Securities V11 — publication checklist

1. Confirm your production domain. Run `python3 prepare_deploy.py https://your-real-domain.example` to create canonical URLs, an absolute social preview image URL and `sitemap.xml`. Never publish the example domain.
2. Confirm exact regulatory registrations, authorizations, distributor/partner relationships and permitted service descriptions for all offerings (especially PMS, securities trading, investment advice and insurance). Have legal pages reviewed before publication. Do not imply unverified licensing.
3. Confirm phone number, office hours, office address, and every service description.
4. The enquiry form opens WhatsApp only: it does NOT save or send data automatically. A real submission backend requires a server/service, consent management and a privacy/security review.
5. Test on mobile and desktop: menu keyboard controls, form validation, WhatsApp sending, links, scrolling, performance and accessibility.
6. Submit sitemap in Google Search Console and verify Google Business Profile after deployment.
7. The CSS contains legacy overrides inherited from V10. V11 adds accessibility improvements without a risky wholesale redesign. Refactor in a separate regression-tested pass.
