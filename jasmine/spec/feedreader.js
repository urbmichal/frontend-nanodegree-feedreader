/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This test suit test our RSS*/
    describe('RSS Feeds', function() {
        //check if all feeds have been defined and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //check if all feeds have url and if it is not empty
         it('url defined', function(){
            for(var i = 0; i <allFeeds.length; i++){
              expect(allFeeds[i].url).toBeDefined();
              expect(allFeeds[i].url.length).not.toBe(0);
            };
         });
         //check if all feeds have names and if it is not empty
         it('names defined',function(){
           for(var i = 0; i <allFeeds.length; i++){
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
           };
         });
    });

    //New suite to check the menu
    describe('The menu', function() {
        //checking if there is a class of "menu-hidden" and if the menu is hidden
        //if true
         it('menu hidden', function(){
            expect($('body').hasClass('menu-hidden')).toEqual(true);

         });
         // Toggles on click event if the menu appears or disappears
          it('menu toogled',function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
        });
      // New test suite that will test initial entries
    describe('Initial Entries', function() {
        // Calls a function to do an asynchronous request
          beforeEach(function (done) {
            loadFeed(0, function() {
              done()
            });

          });
          //check if there is more than 0 .entry inside .feed
          it('check if there is more than 0 entries', function(){
            expect($('.entry').length).toBeGreaterThan(0);
            expect($('.feed').length).toBeGreaterThan(0);
          });

         });

    describe('New Feed Selection', function() {
        // New test suite that looks for new feed selections
      var previousEntry;
         beforeEach(function (done){
           loadFeed(0, function() {
                // the old feed
                previousEntry = $('.feed').html();
                // the new feed
                loadFeed(1, done);
            });
         });
         //copmare two feeds
         it('new feed not as the old',function(){
           expect($('.feed').html()).not.toBe(previousEntry);
         });
    });
}());
