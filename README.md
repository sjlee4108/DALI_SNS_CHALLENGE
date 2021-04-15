# Starter Pack

*SA2 starter pack: setting up things such as node, eslint, babel, and other tools needed for development.*

[deployed url](https://distracted-kilby-a38601.netlify.app/)

## What Worked Well

## What Didn't

## Extra Credit

I used url-loader. Thus, for files smaller than 8KB, it won't copy the image to the build folder like how file-loader did so. Instead, it will encode the file as base64 and save it where the file is included. Thus, the webpage would not have to make a separate request for an image. (I was able to learn the details here: [stack overflow](https://stackoverflow.com/questions/49080007/url-loader-vs-file-loader-webpack#:~:text=file%2Dloader%20will%20copy%20files,media%20assets%20such%20as%20images.)) See webpack.config.js for the code.

## Screenshots
