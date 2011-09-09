/*!
* Date range - Pick more than boogers
* v0.0.1
* https://github.com/mdyer/daterange
* copyright n9nemedia 2011
* MIT License
*/
!function($){
   $.ender({
      range : function(start) {
         var self = this,
             defaults = { start : start ? new Date(start) : new Date(), update : [] },
             months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
         var calendar = {
            initialize : function() {
               self.append(calendar.build());
               $('td:not(.month):not(:empty)').bind('click', calendar.select);
               $('#prev, #next').bind('click', calendar.swap);
            },
            build : function() {
               self.empty();
               var dayFloor = new Date(defaults.start.getFullYear(), defaults.start.getMonth(), 1).getDay(),
                   dayCeil = new Date(defaults.start.getFullYear(), defaults.start.getMonth() + 1, 0).getDate(),
                   weeks = Math.abs(~(dayCeil / 7)),
                   table = document.createElement('table'),
                   header = table.insertRow(),
                   th = header.insertCell(),
                   month = $(table).data('date', defaults.start);

               for(i = 0, c = 1; i < weeks; i++){
                  var row = table.insertRow(-1);
                  for(var j = 0; j < 7; ++j, ++c){
                     var cell = row.insertCell(-1);
                     if (c > dayFloor && c <= dayCeil + dayFloor){
                        cell.innerHTML = c - dayFloor;
                     }
                  }
               }
               th.innerHTML = months[defaults.start.getMonth()] + ' ' + defaults.start.getFullYear();
               th.className = 'month';
               th.colSpan = 7;
               return month;
            },
            select : function(){
               var td = $(this),
                   selection = [defaults.start.getMonth(), td.html(), defaults.start.getFullYear()];
               switch(defaults.update.length){
                  case 0:
                     td.addClass('start');
                     defaults.update.push(selection);
                     calendar.upDate('start');
                  break;
                  case 1:
                     defaults.update.push(selection);
                     if(Math.abs(~(defaults.update[1].join(''))) <= Math.abs(~(defaults.update[0].join('')))){
                        defaults.update.splice(1, 1);
                        alert('Time travel is not possible.');
                        return;
                     }
                     td.addClass('end');
                     calendar.upDate('end');
                  break;
               }
            },
            upDate : function(loc){
               switch(loc){
                  case 'start':
                     $('#start').html(months[defaults.update[0][0]] + ' ' + defaults.update[0][1] + ', ' + defaults.update[0][2]);
                     $('input[name="date_low"]').val((defaults.update[0][0] + 1) + '-' + defaults.update[0][1] + '-' + defaults.update[0][2]);
                  break;
                  case 'end':
                     $('#end').html(months[defaults.update[1][0]] + ' ' + defaults.update[1][1] + ', ' + defaults.update[1][2]);
                     $('input[name="date_high"]').val((defaults.update[1][0] + 1) + '-' + defaults.update[1][1] + '-' + defaults.update[1][2]);
                     // SUBMIT
                     // $('#form').submit();
                     document.forms['form'].submit();
                  break;
               }
            },
            swap : function(){
               self.empty();
               var swap = $(this);
               switch (swap.attr('id')){
                  case 'prev':
                     defaults.start = new Date(defaults.start.getFullYear(), defaults.start.getMonth() - 1, 1);
                  break;
                  case 'next':
                     defaults.start = new Date(defaults.start.getFullYear(), defaults.start.getMonth() + 1, 1);
                  break;
               }  
               calendar.initialize();
            },
         }
         calendar.initialize();
      }
   }, true);
}(ender);