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

var school_page = `
  <div class='region'>
        <h5 class='region_header'><strong>Asia, Australia & New Zealand</strong></h5>
        <ul class='list-unstyled'>
          <li class='country'> Australia
            <p class='school disable'>LaTrobe University</p>
            <p class='school disable'>Monash University</p>
            <p class='school disable'>The Australian National University</p>
            <p class='school disable'>The University of New South Wales</p>
            <p class='school disable'>University of Adelaide</p>
            <p class='school disable'>University of Melbourne</p>
            <p class='school disable'>University of Queensland</p>
            <p class='school disable'>University of Sydney</p>
            <p class='school disable'>University of Western Australia</p>
          </li>
          <li class='country'> China
            <p class='school disable'>Fudan University</p>
            <p class='school disable'>Nanjing University</p>
            <p class='school disable'>Peking University</p>
            <p class='school disable'>Shanghai Jiao Tong University</p>
            <p class='school disable'>Tsinghua University</p>
            <p class='school disable'>Xiamen University</p>
          </li>
          <li class='country'> Hong Kong
            <p class='school disable'>City University of Hong Kong</p>
            <p class='school disable'>Hong Kong University of Science and Technology</p>
            <p class='school disable'>The Chinese University of Hong Kong</p>
            <p class='school disable'>The Hong Kong Polytechnic University</p>
            <p class='school disable'>The University of Hong Kong</p>
          </li>
          <li class='country'> Japan
            <p class='school disable'>Hokkaido University</p>
            <p class='school disable'>Kyoto University</p>
            <p class='school disable'>The University of Tokyo</p>
            <p class='school disable'>Tohoku University</p>
            <p class='school disable'>Tokyo Institute of Technology</p>
            <p class='school disable'>Waseda University</p>
          </li>
          <li class='country'> New Zealand
            <p class='school disable'>University of Auckland</p>
            <p class='school disable'>University of Canterbury</p>
            <p class='school disable'>University of Otago</p>
            <p class='school disable'>Victoria University of Wellington</p>
          </li>
          <li class='country'> South Korea
            <p class='school disable'>Korea Advanced Institute of Science and Technology (KAIST)</p>
            <p class='school disable'>Korea University</p>
            <p class='school disable'>Pohang University of Science and Technology</p>
            <p class='school disable'>Seoul National University</p>
            <p class='school disable'>Yonsei University</p>
          </li>
          <li class='country'> Taiwan
            <p class='school disable'>National Cheng Kung University</p>
            <p class='school disable'>National Chiao Tung University</p>
            <p class='school disable'>National Taiwan University</p>
            <p class='school disable'>National Tsing Hua University</p>
          </li>
          <li class='country'> Thailand
            <p class='school disable'>Chulalongkorn University</p>
          </li>
        </ul>
      </div>
      <div class='region'>
        <h5 class='region_header'><strong>Canada, Mexico & United States of America</strong></h5>
        <ul class='list-unstyled'>
          <li class='country'> Canada
            <p class='school disable'>Concordia University</p>
            <p class='school disable'>McGill University</p>
            <p class='school disable'>Queen's University of Kingston</p>
            <p class='school disable'>Simon Fraser University</p>
            <p class='school disable'>The University of British Columbia</p>
            <p class='school disable'>University of Alberta</p>
            <p class='school disable'>University of Calgary</p>
            <p class='school disable'>University of Guelph</p>
            <p class='school disable'>University of Ottawa</p>
            <p class='school disable'>University of Toronto</p>
            <p class='school disable'>University of Toronto, Mississauga</p>
            <p class='school disable'>University of Victoria</p>
            <p class='school disable'>University of Waterloo</p>
            <p class='school disable'>University of Western Ontario</p>
            <p class='school disable'>Western University</p>
            <p class='school disable'>York University</p>
          </li>
          <li class='country'> Mexico
            <p class='school disable'>Instituto Tecnológico y de Estudios Superiores de Monterrey</p>
          </li>
          <li class='country'> USA
            <p class='school disable'>Arizona State University</p>
            <p class='school disable'>Boston University</p>
            <p class='school disable'>Brandeis University</p>
            <p class='school disable'>Case Western Reserve University</p>
            <p class='school disable'>Colgate University</p>
            <p class='school disable'>Cornell University College of Agriculture and Life Sciences</p>
            <p class='school disable'>Cornell University College of Human Ecology</p>
            <p class='school disable'>George Washington University</p>
            <p class='school disable'>Georgia Institute of Technology</p>
            <p class='school disable'>Northwestern University</p>
            <p class='school disable'>Pennsylvania State University</p>
            <p class='school disable'>Purdue University</p>
            <p class='school disable'>Rice University</p>
            <p class='school disable'>Stanford University</p>
            <p class='school disable'>Tulane University</p>
            <p class='school disable'>University of Arizona</p>
            <p class='school disable'>University of California</p>
            <p class='school disable'>University of Colorado Boulder</p>
            <p class='school disable'>University of Connecticut</p>
            <p class='school disable'>University of Florida</p>
            <p class='school disable'>University of Georgia</p>
            <p class='school disable'>University of Goteborg</p>
            <p class='school disable'>University of Hawaii at Manoa</p>
            <p class='school disable'>University of Illinois, Urbana Champaign (UIUC)</p>
            <p class='school disable'>University of Maryland</p>
            <p class='school disable'>University of Miami</p>
            <p class='school disable'>University of Michigan, Ann Arbor</p>
            <p class='school disable'>University of North Carolina at Chapel Hill</p>
            <p class='school disable'>University of Notre Dame</p>
            <p class='school disable'>University of Oregon</p>
            <p class='school disable'>University of Pennsylvania</p>
            <p class='school disable'>University of Pittsburgh</p>
            <p class='school disable'>University of Texas at Austin</p>
            <p class='school disable'>University of Virginia</p>
            <p class='school disable'>University of Washington</p>
          </li>
        </ul>
      </div>
      <div class='region'>
        <h5 class='region_header'><strong>Europe, Middle East & Africa</strong></h5>
        <ul class='list-unstyled'>
          <li class='country'> Austria
            <p class='school disable'>Management Centre Innsbruck</p>
          </li>
          <li class='country'> Croatia
            <p class='school disable'>University of Zagreb</p>
          </li>
          <li class='country'> Denmark
            <p class='school disable'>Aarhus University</p>
            <p class='school disable'>Technical University of Denmark</p>
            <p class='school disable'>University of Copenhagen</p>
          </li>
          <li class='country'> Estonia
            <p class='school disable'>Tallinn University of Technology</p>
          </li>
          <li class='country'> Finland
            <p class='school disable'>University of Helsinki</p>
          </li>
          <li class='country'> France
            <p class='school disable'>University Pierre et Marie Curie</p>
            <p class='school disable'>Université Joseph Fourier</p>
          </li>
          <li class='country'> Germany
            <p class='school disable'>Ludwig-Maximilians-University, Munich</p>
            <p class='school disable'>Rupert Charles University of Heidelberg</p>
            <p class='school disable'>Technical University of Kaiserslautern</p>
            <p class='school disable'>Technical University of Munich</p>
            <p class='school disable'>University of Hohenheim</p>
            <p class='school disable'>University of Kaiserslautern</p>
            <p class='school disable'>University of Konstanz</p>
            <p class='school disable'>University of Ulm</p>
          </li>
          <li class='country'> Ireland
            <p class='school disable'>Trinity College Dublin</p>
            <p class='school disable'>University College Cork, Ireland</p>
            <p class='school disable'>University College Dublin</p>
          </li>
          <li class='country'> Netherlands
            <p class='school disable'>Delft University of Technology</p>
            <p class='school disable'>Eindhoven University of Technology</p>
            <p class='school disable'>Leiden University</p>
            <p class='school disable'>Leiden University Medical Center (LUMC)</p>
            <p class='school disable'>Radboud University Nijmegen</p>
            <p class='school disable'>University of Amsterdam</p>
            <p class='school disable'>Utrecht University</p>
          </li>
          <li class='country'> Norway
            <p class='school disable'>Norwegian University of Science & Technology (NTNU)</p>
            <p class='school disable'>University of Oslo</p>
          </li>
          <li class='country'> Poland
            <p class='school disable'>Cracow University of Technology</p>
            <p class='school disable'>Jagiellonian University Poland</p>
            <p class='school disable'>Warsaw University of Technology</p>
          </li>
          <li class='country'> Spain
            <p class='school disable'>Universidad Autonoma de Madrid</p>
          </li>
          <li class='country'> Sweden
            <p class='school disable'>Chalmers University of Technology</p>
            <p class='school disable'>Karolinska Institute</p>
            <p class='school disable'>Lund University</p>
            <p class='school disable'>Royal Institute of Technology (KTH)</p>
            <p class='school disable'>Stockholm University</p>
            <p class='school disable'>University of Gothenburg</p>
            <p class='school disable'>Uppsala University</p>
          </li>
          <li class='country'> Switzerland
            <p class='school disable'>ETH Zurich (Swiss Federal Institute of Technology in Zurich)</p>
            <p class='school disable'>Ecole Polytechnique Federale de Lausanne</p>
            <p class='school disable'>University of Geneva</p>
            <p class='school disable'>University of Zurich</p>
          </li>
          <li class='country'> Turkey
            <p class='school disable'>Bilkent University</p>
          </li>
          <li class='country'> United Kingdom
            <p class='school disable'>King's College London</p>
            <p class='school disable'>Newcastle University</p>
            <p class='school disable'>University College London, University London (UCL)</p>
            <p class='school disable'>University of Bath</p>
            <p class='school disable'>University of Birmingham</p>
            <p class='school disable'>University of Bristol</p>
            <p class='school disable'>University of Dundee</p>
            <p class='school disable'>University of Durham</p>
            <p class='school disable'>University of Edinburgh</p>
            <p class='school disable'>University of Glasgow</p>
            <p class='school disable'>University of Leeds</p>
            <p class='school disable'>University of Liverpool</p>
            <p class='school disable'>University of Manchester</p>
            <p class='school disable'>University of Nottingham</p>
            <p class='school disable'>University of Sheffield</p>
            <p class='school disable'>University of St Andrews</p>
            <p class='school disable'>University of York</p>
          </li>
        </ul>
      </div>`

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
  var subjects = ['Chemistry', 'Food Science', 'Life Science','Math', 'Physics', 'Statistics'];
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
            $('#input_mod').val("")
            return false;
          }
          var result_list = "";
          res.mod.forEach(function(mod) {
            result_list += display_mod(mod);
          });
          document.getElementById('result_mod').innerHTML = result_list;
          if (res.mod.length === 1) {
            $('.mod_info').removeClass('disable');
          }
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
            $('#input_sch').val("")
            return false;
          }
          var sch_list = "";
          res.sch.forEach(function(sch) {
            sch_list += display_sch(sch);
          });
          document.getElementById('result_sch').innerHTML = sch_list;
          if (res.sch.length === 1) {
            $('.sch_info').removeClass('disable');
          }
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
    document.getElementById('school').innerHTML = school_page;
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
  $("#school").on('click','.country', event => {
    $(event.currentTarget).children().toggleClass('disable');
  });
});

$(function(){
  $("#school").on('click','.school', event => {
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
      $('.sch_info').removeClass('disable');
      $('#input_sch').val("");
    });
    return false;
  });
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
      $('.sch_info').removeClass('disable');
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
      $('.mod_info').removeClass('disable');
      $('#input_mod').val("");

    });
    return false;
  });
});

function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    var input = escapeRegExp(q);
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(input, 'i');

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
