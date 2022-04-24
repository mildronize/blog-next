# Todo

- [X] Resolve image locally not from static path
  - [X] When dev mode, serve static `_posts` 
  - [X] Convert markdown replace to currect path in public folder
- [X] Auto Generate UUID (in dev mode)
- [ ] Short URL Mapping
  - [ ] Need to handle by myself, `next export` cannot use redirect.
- [X] Auto-refresh when markdown content changed [ref](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/scripts/next-remote-watch.js)
- [X] Theme Switch [Ref](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/components/ThemeSwitch.js)
- [ ] Move `posts` to `_contents/posts`
  - [X] Markdown content allow to no date (nullable)
  - [ ] Disable auto UUID for path `_contents`, apply only uuid in  `_contents/posts`
  - [ ] Using `slug` in frontmatter to override the auto gen slug by title or filename
- [ ] Migrate Theme from my Gatsby [Ref](https://github.com/mildronize/mildronize.github.io)
- [ ] Migrate content markdown
- [ ] Migrate to TypeScript
  - [X] Using TypeScript Global Import [ref](https://github.com/leighhalliday/next-blog/blob/main/tsconfig.json)
- [ ] Render Tag
- [ ] Deploy to Azure Static Site


