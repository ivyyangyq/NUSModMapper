// var lim = prompt("Please enter the node limit", 100);
// $.ajax({
//     url: '/compute',
//     data : {id: "leong.hw.lggg", limit:lim},
// timeout: 3600 * 1000
// }).done(RenderGraph);

function load_network_example()
{
document.getElementById('network_text').value = "0 1\n0 2\n1 2\n2 3\n3 4\n1 4\n3 5\n5 6\n6 7\n7 8\n5 8\n8 9\n7 10\n9 10\n9 11\n11 12\n4 12\n10 13\n13 14\n6 15\n14 16\n11 16\n15 17\n15 18\n16 18\n13 19\n14 20\n12 21\n17 21\n17 22\n19 23\n22 23\n18 24\n23 24\n19 25\n20 26\n21 27\n20 28\n22 29\n24 30";
// trivial example, for testing
// document.getElementById('network_text').value = "0 1\n0 2";

}

function display_mod(mod) {
  var mod_info = "<div class='mod_display'><h5 class='mod_header'></strong>" + mod['Module code'] + ' '+ mod['Name'];
  mod_info += "</strong></h5><ul class='mod_info list-unstyled'><li class='mod_title collection-item'><p>Module Description:</p><p class='mod_info'>";
  mod_info += mod['Module description'] + "</p><li class='mod_title collection-item'><p>Currently Offered in NUS:</p><p class='mod_info'>";
  if (mod['Currently offered in NUS'] == false || mod['Currently offered in NUS'] =='N.A.'){
    mod_info += 'NO！';
  } else {
    mod_info += 'Yes';
  }
  mod_info += "</p><li class='mod_title collection-item'><p>Number of Schools Offered:</p><p class='mod_info'>";
  mod_info += mod['Number of school offered'] + "</p><li class='mod_title collection-item'><p>Offered At:</p><div class='mod_sch_list'>";
  var schools = mod['Offered at']
  schools.forEach(function(sch) {
    var sch_info = "<h5 class='mod_sch_header'>" + sch.Name;
    sch_info +=  "</h5><ul class='mod_sch list-unstyled'><li class='mod_sch_title'><p>Partner University Module:</p><p class='mod_sch_info'>";
    sch_info += sch['Partner university code'] + ' ' + sch['Partner university module name'];
    sch_info += "</p></li><li class='mod_sch_title'><p>Partner University Module Credit:</p><p class='mod_sch_info'>";
    sch_info += sch['Partner university module credit'] + "</li>";
    mod_info += sch_info + "</p></li></ul>";
  });
  mod_info += "</div></li></ul></div>";
  return mod_info;
}

function display_sch(sch) {
  var sch_info = "<div class='sch_display'><h5 class='sch_header'><strong>";
  sch_info += sch['Name']+ "</strong></h5></div>";
  return sch_info;
}

$(function(){
    $("form#search_mod").submit(function(){
        var module_text = document.getElementById('input_mod').value;
        if (module_text == "")
            return false;
        var formData = new FormData(document.getElementById('search_mod'));
        formData.append('mod', module_text);
        $.ajax({
            url: '/search_mod',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false
        }).done(function(res){
          $('#module_button').siblings().removeClass('active');
          $('#module_button').addClass('active');
          $('#result_mod').siblings().addClass('disable');
          $('#result_mod').removeClass('disable');
          if (res.mod == "Not Found") {
            return false;
          }
          var result_list = "";
          res.mod.forEach(function(mod) {
            result_list += display_mod(mod);
          });
          document.getElementById('result_mod').innerHTML = result_list;
        });
        return false;
    });
});

$(function(){
    $("form#search_sch").submit(function(){
        var school_text = document.getElementById('input_sch').value;
        if (school_text == "")
            return false;
        var formData = new FormData(document.getElementById('search_sch'));
        formData.append('sch', school_text);
        $.ajax({
            url: '/search_sch',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false
        }).done(function(res){
          $('#school_button').siblings().removeClass('active');
          $('#school_button').addClass('active');
          $('#result_sch').siblings().addClass('disable');
          $('#result_sch').removeClass('disable');
          if (res.sch == "Not Found") {
            return false;
          }
          var sch_list = "";
          res.sch.forEach(function(sch) {
            sch_list += display_sch(sch);
          });
          document.getElementById('result_sch').innerHTML = sch_list;
        });
        return false;
    });
});

$(function(){
  $("#home_button").on('click', ()=> {
    $('#home_button').siblings().removeClass('active');
    $('#home_button').addClass('active');
    $('#home').removeClass('disable');
    $('#home').siblings().addClass('disable');
  })
});

$(function(){
  $(".mod_header").on('click', event => {
    $(event.currentTarget).siblings().toggle();
  });
});
