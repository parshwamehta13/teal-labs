var json = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': 'data.json',
    'dataType': "json",
    'success': function (data) {
    json = data;
  }
  });
  return json;
})();

function print(x){
  console.log(x);
}


var correct=0;
var myMap = new Map ();
for (i=0;i<json.length;i++){
  if (json[i].Correct==1){
    correct+=1;
  }
  if (myMap.has(json[i].StudentID)){
    var temp = myMap.get(json[i].StudentID);
    temp.push(json[i]);
    myMap.set(json[i].StudentID,temp);
  }else{
    var temp = new Array();
    temp.push(json[i]);
    myMap.set(json[i].StudentID,temp);
  }
}

generateDoughnut(correct,json.length-correct,"#body");

// Given a student and a topic, accuracy in that topic is measured
function topicPerformance(student,topic){
  var temp = myMap.get(student);
  var correct = 0;
  var subtopic;
  for (i=0;i<temp.length;i++){
    if (temp[i].AssessmentItemId.length==28){
      subtopic = temp[i].AssessmentItemId.substring(1,3);
    }
    else{
      subtopic = temp[i].AssessmentItemId.substring(1,4);
    }
    if (subtopic.localCompare(topic)==0){

    }
  }
}

function generateDoughnut(a,b,id){
      var dataset = {
        data: [a,b],
      };
      var width = 460,
          height = 300,
          radius = Math.min(width, height) / 2;

      var color = d3.scale.category20();

      var pie = d3.layout.pie()
          .sort(null);

      var arc = d3.svg.arc()
          .innerRadius(radius - 100)
          .outerRadius(radius - 50);

      var svg = d3.select(id).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var path = svg.selectAll("path")
          .data(pie(dataset.data))
        .enter().append("path")
          .attr("fill", function(d, i) { return color(i); })
          .attr("d", arc);

}


    
  