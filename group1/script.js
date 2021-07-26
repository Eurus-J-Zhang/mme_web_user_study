// Used to log all actions of the user
function sendInfoToServer(action_type, parameters) {
	date = Date.now();
	console.log(action_type + " " + parameters + " | " + date.toString());
	// TODO: send to server
}



    $(".submitbutton").click(function(){
        const values = [];
        $("#leftValues option").each(function()
        {
            // Add $(this).val() to your list
            values.push($(this).val());
        });
        alert("Submitted: " + values.join(', '));
    })


    $("#btnLeft").click(function () {
        var selectedItem = $("#rightValues option:selected");
        $("#leftValues").append(selectedItem);
		
		sendInfoToServer("add", selectedItem.val());
    });
    
    $("#btnRight").click(function () {
        var selectedItem = $("#leftValues option:selected");
        $("#rightValues").append(selectedItem);
		
		sendInfoToServer("remove", selectedItem.val());
    });
    

    $("#btnLeft").click(function(){
        const random_number = Math.floor(Math.random() * 8)+1;
        const random_value = "X".concat(random_number.toString());
        $("#recommendataion").innerHTML = "Variable review recommendation: ".concat(random_value);
        const myDataAI = generateDataPairFromX(allData[random_value],allData.Y);
        const myChartAI = createChart(myDataAI, 'chart-container-AI', random_value, 'Y');
        console.log('ready :)');
        $('#trybuttontwo').style.visibility="visible";
        $("#trybuttontwo").click(function(){
            const myData = generateDataPairFromX(allData[random_value], allData.Y);
            const myDataTwo = generateDataPairFromX(allData[random_value], allData[random_value]);
            const myChart = createChart(myData, 'chart-container', random_value, 'Y');
            const myChartTwo = createChart(myDataTwo, 'chart-container-two',random_value, random_value);
            console.log('ready :)');
            console.log(random_value);
        })
    });

    $("#btnRight").click(function(){
        const random_number = Math.floor(Math.random() * 8)+1;
        const random_value = "X".concat(random_number.toString());
        $("recommendataion").innerHTML = "Variable review recommendation: ".concat(random_value);
        const myDataAI = generateDataPairFromX(allData[random_value],allData.Y);
        const myChartAI = createChart(myDataAI, 'chart-container-AI', random_value, 'Y');
        console.log('ready :)');
        $('#trybuttontwo').style.visibility="visible";
        $("#trybuttontwo").click(function(){
            const myData = generateDataPairFromX(allData[random_value], allData.Y);
            const myDataTwo = generateDataPairFromX(allData[random_value], allData[random_value]);
            const myChart = createChart(myData, 'chart-container', random_value, 'Y');
            const myChartTwo = createChart(myDataTwo, 'chart-container-two',random_value, random_value);
            console.log('ready :)');
            console.log(random_value);
        })
    });


    let m1,m2,n=[],
        mainObj = {};

    let datapairxy =[];
    let datapairxx =[];

    let allData;



/*    PLOT GENERATION    */


    function generateDataPairFromX(x, y){
        const data = [];
        for (var i=0; i<x.length;i++){
            data.push({
                x: x[i],
                y: y[i]
            })
        }
        return data;
    };

function createChart(data, containerId, xID, yID){
    var container = document.getElementById(containerId);
    container.innerHTML = '';
    var canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return new Chart(canvas, {
        type: 'scatter',
        data: {     
            datasets: [{
                label: 'Dataset',
                data: data,

            }]
        },
        options: {
            scales:{
                xAxes:[{
                    scaleLabel: {
                      display: true,
                      labelString: xID,
                    }
                }],
                yAxes:[{
                    scaleLabel: {
                      display: true,
                      labelString: yID
                    }
                }]
            }
        }   
    });
}



function visualizeVar(userSelectedX) {
    const myData = generateDataPairFromX(allData[userSelectedX], allData.Y);
    console.log(allData)
    const myChart = createChart(myData, 'chart-container', userSelectedX, 'Y');
    console.log('ready :)');
	sendInfoToServer("vis-1", userSelectedX);
}


function visualize2vars(userSelectedXleft, userSelectedXbottom) {
	const myDataTwo = generateDataPairFromX(allData[userSelectedXbottom],allData[userSelectedXleft]);
    const myChartTwo = createChart(myDataTwo, 'chart-container-two',userSelectedXbottom, userSelectedXleft);
    console.log('ready :)');
	sendInfoToServer("vis-2", [userSelectedXleft, userSelectedXbottom]);
}





$('select#variable-one').click(function(){
    const userSelectedX = document.getElementById("variable-one").value;
	visualizeVar(userSelectedX);
});






/*    DATA VISUALIZATION EVENTS    */



$("select#variable-two").click(function(){
	const userSelectedXleft = document.getElementById("variable-two").value;
    const userSelectedXbottom = document.getElementById("variable-three").value;
    visualize2vars(userSelectedXleft, userSelectedXbottom);
}); 

$('select#variable-three').click(function(){
	const userSelectedXleft = document.getElementById("variable-two").value;
    const userSelectedXbottom = document.getElementById("variable-three").value;
    visualize2vars(userSelectedXleft, userSelectedXbottom);
})




/*    LOADING DATA SET    */


document.querySelector('#trybuttontwo').style.visibility="hidden";

fetch("./data.json")
    .then(response => response.json())
    .then(data=>{
        allData = data;
		const labels = Object.keys(data);
		visualizeVar(labels[0]);
		visualize2vars(labels[0], labels[0]);
		
		document.getElementById("variable-one").value = labels[0];
		document.getElementById("variable-two").value = labels[0];
		document.getElementById("variable-three").value = labels[0];
		
		/*
        const myData = generateDataPairFromX(allData.X1, allData.Y);
        const myChart = createChart(myData, 'chart-container', 'X1', 'Y');
        const myDataTwo = generateDataPairFromX(allData.X1, allData.X1);
        const myChartTwo = createChart(myDataTwo, 'chart-container-two','X1', 'X1');
		*/
    });

