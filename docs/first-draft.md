# Site overhaul — first draft notes

> Rough notes, kept verbatim as written. Decisions derived from them live in
> [`architecture.md`](./architecture.md).

Id like to rebuild the site as some sort of "tech conference" or "theme park/playground" with "booths" like a media booth 
and other parts 
dont like the idea of a static personal page as it fees very much like a public political publication
- taking inspiration from the structure of this site from one of my friends, : https://guidefari.com/
- i would say that i do like the design and terminal aesthetic of my landing page rigt now and id like to keep that
- in general i want the site to not necessarily be playful but someone "delightful" to use and include some sounds when
navigating and clicking on stuff, similar to what the guidefari does, 



- im also thinking about having the same side bar menu vibe going on, but dont do prefer the menu i have for smaller screens
or id rather have the hamburger menu be paired with the word "booths" to prompt the curiosity of the visitor

- i would like a "home" side bar button 
  > the home page would still hold the top part of my current page, and include a visual note encouraging visitor 
    to explore my playground and checkout the other "booths"


- i would like to borrow the "now" side bar button 
  > this would borrow the same ideas from the guidefari site 
  > more information about me can be obtained from my resume in the docs folder, 

- also borrow the unoffice hours idea


- i would like a media section that would allow me to publish a quick write up about my thoughts on a youtube vid, 
or a podcast or a tweet, 
- it would  show a preview a preview at the top, of the media in question,  
- and then some body of the content with my thoughts and other useful sections 
- my idea is these would be short and not full on blogposts, more like reactions 


- i would like a "Reads" side bar button that would expand to a few options: 
  - "Refs" > official references and good refs 
  - "Bliki"  

- i would like a "Writing" side bar button that would expand to a few options: 
  - "TIL" 
  - "Random Reflections"  
  - "Blog"- this would list items with previews to my actual blog  


- then ofcourse we need a projects side button leading to the projects page, 
  - this would then list projects, with previews, links and github links (where applicable) just like the guidefari

- i think i would like a tinkering button as well 
  - it would expand to "Terminal" and "Toolset" 


- otherwise we should maintain the overal design langauge and terminal vibes with blinking cursor etc 


- obviosly with such changes we would probably need a whole system and app design change with lots more parts than just a simple
site, 

- so i would like to convert the proj to a monorepo, taking inspiration from what we have in the amax ecomm project, 
  basically same monorepo tools and setup 
  - the playground can be a nextjs app
  - we will likely need a cms app setup (bare bones for now) - i propose payload cms
  - if we do need a backend we do the same honojs setup, same validation toos and db tools 

- for the fronted app itself, most of the other pages that need content that we currently dont have in hand can be 
populated with a single default item, whose heading and contents could simply say that this is currently being worked 
on and is comming soon. 
- i also genrally prefer using daisyui and tailwind as defaut, and all the other frontend tools from the amax proj, 
including the data fetching and state management, and form library and all that etc, 
