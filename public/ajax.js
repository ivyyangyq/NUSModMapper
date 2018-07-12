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

var mod_list;
function getModList(){
  $.ajax ({
      async: false,
      url: '/send_mod_list',
      method: 'POST',
      processData: false,
      contentType: false
  }).done(function(res){
    mod_list = Object.keys(res.mod);
  });
}

getModList();

var sch_list;
function getSchList() {
  $.ajax ({
      async: false,
      url: '/send_sch_list',
      method: 'POST',
      processData: false,
      contentType: false
  }).done(function(res){
    sch_list = res.sch;
  });
}
getSchList();

// display module
function display_mod(mod) {
  var mod_info = `<div class='mod_display'>
    <div class='collapsible_header'>
      <h5 class='mod_header'><strong>${mod['Module code']} ${mod.Name}</strong></h5>
    </div>
    <div class='mod_info disable'>
    <ul class='list-unstyled'>
      <li class='mod_title collection-item'>
        <p>Module Description:</p>
      </li>
      <p class='mod_info'>${mod['Module description']}</p>
      <li class='mod_title collection-item'>
        <p>Currently Offered in NUS:</p>
      </li>
      <p class='mod_info'>`;
  if (mod['Currently offered in NUS'] == false || mod['Currently offered in NUS'] =='N.A.'){
    mod_info += 'NO！';
  } else {
    mod_info += 'Yes';
  }
  mod_info += `<li class='mod_title collection-item'>
        <p>Number of Schools Offered:</p>
      <p class='mod_info'>${mod['Number of school offered']}</p>
      <li class='mod_title collection-item'>
        <p>Offered At:</p></li>
        <div class='mod_sch_list'>`;
  var schools = mod['Offered at']
  schools.forEach(function(sch) {
    var sch_info = `<h5 class='mod_sch_header'>${sch.Name}</h5>
            <ul class='mod_sch list-unstyled'>
              <li class='mod_sch_title'>
                <p>Partner University Module:</p>
                <p class='mod_sch_info'>
                  ${sch['Partner university code']} ${sch['Partner university module name']}
                </p>
              </li>
              <li class='mod_sch_title'>
                <p>Partner University Module Credit:</p>
                <p class='mod_sch_info'>
                  ${sch['Partner university module credit']}
                </p>
              </li>
            </ul>`;
    mod_info += sch_info;
  });
  mod_info += "</div></li><a class='hide_content' href='#'> hide</a></ul></div></div>";
  return mod_info;
}

function display_sch(sch) {
  var sch_info = `<div class='sch_display'>
    <div class='collapsible_header'>
      <h5 class='sch_header'><strong>${sch['Name']}</strong></h5>
    </div>
    <div class='sch_info disable'>
    <ul class='list-unstyled'>`;
  var subjects = ['Chemistry', 'Food Science', 'Life Science','Math', 'Physics', 'Statistic'];
  subjects.forEach(sub => {
    if (sch.hasOwnProperty(sub)) {
      if (sub === 'Food Science') {
        sch_info += "<li class='Food'>";
      } else if (sub === 'Life Science') {
        sch_info += "<li class='Life'>";
      } else {
        sch_info += `<li class=${sub}>`;
      }

      sch_info += `<p class='sch_title'><strong>${sub}</strong></p>`;
      var numOfMods = `Number of ${sub} mods`;
      sch_info += `<p class='sch_title'>Number of modules</p>
      <p class='sch_info'>${sch[sub][numOfMods]}</p>
      <p class='sch_title sch_mod'>Modules:</p>
      <div class='sch_mod_list disable'>`;
      var sub_name = `${sub}`;
      var modules = sch[sub_name];
      modules['Mods'].forEach(mod => {
        sch_info += `<h5 class='sch_mod_header'>${mod['NUS module code']} ${mod['NUS module name']}</h5>
        <ul class='list-unstyled'>
          <li class='sch_mod_title'>
            <p>Partner University Module:</p>
            <p class='sch_mod_info'>
              ${mod['Partner university code']} ${mod['Partner university module name']}
            </p>
          </li>
          <li class='sch_mod_title'>
            <p>Partner University Module Credit:</p>
            <p class='sch_mod_info'>
              ${mod['Partner university module credit']}
            </p>
          </li>
          <li class='sch_mod_title'>
            <p>Currently offered in NUS:</p>
            <p class='sch_mod_info'>`;
          if (mod['Currently offered in NUS'] == false || mod['Currently offered in NUS'] =='N.A.'){
            sch_info += 'NO！';
          } else {
            sch_info += 'Yes';
          }
          sch_info += `</p></li></ul>`;
      })
      sch_info += "</div></li>";
    }
  })
  sch_info+=`<a class='hide_content' href='#'> hide</a></ul></div></div>`;
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
          $('#input_mod').val("");

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
          $('#input_sch').val("");
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
  $("#module_button").on('click', ()=> {
    $('#module_button').siblings().removeClass('active');
    $('#module_button').addClass('active');
    $('#modules').removeClass('disable');
    $('#modules').siblings().addClass('disable');
  })
});

$(function(){
  $("#school_button").on('click', ()=> {
    $('#school_button').siblings().removeClass('active');
    $('#school_button').addClass('active');
    $('#school').removeClass('disable');
    $('#school').siblings().addClass('disable');
  })
});

$(function(){
  $("#about_button").on('click', ()=> {
    $('#about_button').siblings().removeClass('active');
    $('#about_button').addClass('active');
    $('#about').removeClass('disable');
    $('#about').siblings().addClass('disable');
  })
});

$(function(){
  $("#result_mod").on('click', '.collapsible_header',event => {
    $(event.currentTarget).siblings().toggleClass('disable');
  });
});

$(function(){
  $("#result_mod").on('click', '.hide_content',event => {
    $(event.currentTarget).parent().parent().toggleClass('disable');
  });
});

$(function(){
  $("#result_sch").on('click', '.collapsible_header',event => {
    $(event.currentTarget).siblings().toggleClass('disable');
  });
});

$(function(){
  $("#result_sch").on('click', '.hide_content',event => {
    $(event.currentTarget).parent().parent().toggleClass('disable');
  });
});

$(function(){
  $("#result_sch").on('click', '.sch_mod',event => {
    $(event.currentTarget).next('.sch_mod_list').toggleClass('disable');
  });
});

$(function(){
  $(".card .btn").on('click',event => {
    var subject = $(event.currentTarget).prev().prev().text();
    var formData = new FormData();
    formData.append('sub', subject);
    $.ajax({
      url: '/get_subject',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false
    }).done(function(res){
      $('#result_mod').siblings().addClass('disable');
      $('#result_mod').removeClass('disable');
      var result_list = "";
      res.sub.forEach(function(mod) {
        result_list += display_mod(mod);
      });
      document.getElementById('result_mod').innerHTML = result_list;
      $('#input_mod').val("");

    });
    return false;
  });
});

$(function(){
  $("#result_mod").on('click', '.mod_sch_header',event => {
    var sch_text = $(event.currentTarget).text();
    var formData = new FormData();
    formData.append('sch', sch_text);
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
      $('#input_sch').val("");
    });
    return false;
  });
});

$(function(){
  $("#result_sch").on('click', '.sch_mod_header',event => {
    var mod_text = $(event.currentTarget).text();
    var formData = new FormData();
    formData.append('mod', mod_text);$.ajax({
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
      $('#input_mod').val("");

    });
    return false;
  });
});

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$(document).ready(() => {
  $('#search_mod .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
  {
    name: 'mod_list',
    limit: 5,
    source: substringMatcher(mod_list)
  });
});

$(document).ready(() => {
  $('#search_sch .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
  {
    name: 'typeahead',
    //limit: 5,
    source: substringMatcher(sch_list)
  });
});
