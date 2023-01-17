# Doggone

Doggone is an app designed for communities of dog owners. It is to assist with the expeditious reuniting of dogs with their owners.  


## Features: 
If a user creates an account, they have full access to all of the app's functionality. They can report that their dog is lost, upload physical characteristics/images, and provide their contact information if their pet is found.  Also, users with accounts can view sightings of their dogs, provided on a Google Map interface.  A sighting can include the precise location of the sighting, the time, as well as the "finder" 's contact information. Finally  account holders have a message board available for any discussions to help to serve the community better.  Messages can be read, created, updated, and deleted, but will always be publicly associated with their username.

If a user doesn't have an account, they can still create sightings, if they happen to come across a dog in their neighborhood.  Simply click on the map provided (using their browser's location service) and click on the location.  The finder can add other details as well about the dog they've seen. Finally, they too can provide their contact information, if they choose.

All users can view the galleries of dogs.  There are 2 galleries: one for dogs that have been sighted ("Seen Dogs"), and one for those who've not yet been seen ("Missing Dogs").  Dogs that have initially been reported missing will be added to the Missing Dogs gallery. Upon being seen, the dog will be moved to the Seen Dogs gallery.  When a dog is claimed, it will be removed from the galleries.  Only account holders can claim a dog.



## Requirements
* node v16.15.0
* npm v9.1.2
* ruby 2.7.4p191
* rails 6.1.3.2


### Setup and installation
* Fork and clone
* Run npm install 
* Run rails s to start the backend
* Run npm start --prefix client


## License

Copyright (2023) Shawn Hart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.