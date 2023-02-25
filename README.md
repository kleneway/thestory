# THE STORY

Demo: https://momentumlabs.app/timeline


"NBA Top Shot is a living, breathing archive and digital museum." Austin Kent, Content Lead - NBA Top Shot at Dapper Labs
https://twitter.com/AustinKent/status/1627333682833793024

Over the past three years, NBA Top Shot has created over 4,000 expertly-curated Moments that tell the story of the each NBA season. These Moments are a specific snapshot in time that highlight each player and team with a detailed description of the Moment and why it matters.

On the NBA Top Shot site you can view your Moments in a static grid, but I wanted to create a more dynamic timeline view to provide a more engaging and fun way to view Moments.

# THE REPO

Here is the code for the Timeline. The Timeline component created with the open-source library TimelineJS <https://timeline.knightlab.com/> Each story is curated with some filters and metadata, and then is displayed in a simple NextJS site that can be hosted on Vercel.

The front-end code is in the src/pages/timeline/[id].tsx file. There you will find the TypeScript types, metadata, and page wrapper for the Timeline element. There are also some custom CSS styles that can be configured as needed.

The API is at src/pages/api/timeline.ts This code will call the database to get the correct set of Moments and transform each Moment into a TimelineJS-compatible Slide.



This repo was originally clone from the NextJS starter template: <https://github.com/theodorusclarence/ts-nextjs-tailwind-starter>
