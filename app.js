// Converts Json file into a variable
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



var correct=0;  // variable to store number of correct attempts
var time_spent = 0;
var myMap = new Map (); // Map object where key is studentid and value is correct and incorrect questions
var mySubMap = new Map(); // Map object for Subject Wise performance
for (i=0;i<json.length;i++){
  time_spent+=json[i].TimeTaken;
  if (json[i].Correct==1){
    correct+=1;
  }
  if (myMap.has(json[i].StudentID)){
    var temp = myMap.get(json[i].StudentID);
    if (json[i].Correct==1){
      temp.correct++;
    }else{
      temp.incorrect++;
    }
    myMap.set(json[i].StudentID,temp);
  }else{
    var temp = new Object();
    temp.correct=0;
    temp.incorrect=0;
    if (json[i].Correct==1){
      temp.correct++;
    }else{
      temp.incorrect++;
    }
    myMap.set(json[i].StudentID,temp);
  }
  var sub = (json[i].AssessmentItemId.length==28 ? json[i].AssessmentItemId.substring(1,3) : json[i].AssessmentItemId.substring(1,4));
  if (mySubMap.has(sub)){
    if (json[i].Correct==1){
      var temp = mySubMap.get(sub);
      temp.correct +=1;
    }else{
      var temp = mySubMap.get(sub);
      temp.incorrect +=1; 
    }
    mySubMap.set(sub,temp);
  }else{
    var temp = {"correct":0,"incorrect":0};
    if (json[i].Correct==1){
      temp.correct+=1;
    }else{
      temp.incorrect+=1;
    }
    mySubMap.set(sub,temp);  
  }
}

//console.log(mySubMap);
//console.log(json[1].AssessmentItemId.length);
var student_analysis = new Array();
for (var [key, value] of myMap) {
  student_analysis.push({'id':key,'correct':value.correct,'incorrect':value.incorrect});
}

var subject_analysis = new Array();
for (var [key, value] of mySubMap){
  subject_analysis.push({'sub':key,'correct':value.correct,'incorrect':value.incorrect});
}
//console.log(student_analysis);

generateDoughnut(correct,json.length-correct,"#doughnutchart");

// Function to generate doughnut plot at id = id and a,b being the dataset items
function generateDoughnut(a,b,id){
      var dataset = {
        data: [a,b],
      };
      var width = 400,
          height = 400,
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


// Angular JS for data binding
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope){
  $scope.json = json;
  $scope.number_attempts = json.length;
  $scope.number_correct = correct;
  $scope.number_students = myMap.size;
  $scope.correct_percentage = Math.round((correct/json.length) * 100);
  $scope.incorrect_percentage = 100 - $scope.correct_percentage;
  $scope.student_analysis = student_analysis; 
  $scope.subject_analysis = subject_analysis;
  // $scope.studentid_array = [];
  $scope.average_time_spent = Math.round(time_spent/json.length);
  //console.log($scope.student_analysis_id);
});
    
  