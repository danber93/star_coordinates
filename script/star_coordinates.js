var margin = {top: 20, right: 20, bottom: 30, left: 40}; // to memorize the margins

// screen is 800 x 300
// actual drawing leaves a margin around
// width and height are the size of the actual drawing
//
var width = 1200 - margin.left - margin.right;
var height = 800 - margin.top - margin.bottom;



var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)     // i.e., 800 again 
    .attr("height", height + margin.top + margin.bottom)   // i.e., 300 again
    .append("g")                                           // g is a group
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");   
    .attr("transform", "translate(500, 400)");                                                 


d3.json("data/star-coord.json").then(function(data) {

    var dataset = data[0];
    
    function vector_sum_x(d, sum) {
        let x1 = x1Scale(d.x1) * Math.sin(0*Math.PI/5);

        let x2 = x2Scale(d.x2) * Math.sin(2*Math.PI/5);

        let x3 = x3Scale(d.x3) * Math.sin(4*Math.PI/5);

        let x4 = x4Scale(d.x4) * Math.sin(6*Math.PI/5);

        let x5 = x5Scale(d.x5) * Math.sin(8*Math.PI/5);

        switch(sum) {
        case 0 :
            return (0);
        case 1:
            return (x1);
        case 2:
            return (x1 + x2);
        case 3:
            return (x1 + x2 + x3);
        case 4:
            return (x1 + x2 + x3 + x4);
        case 5:
            return (x1 + x2 + x3 + x4 + x5);
        }
        return (x1+x2+x3+x4+x5);
    }

    function vector_sum_y(d, sum) {
        let x1 = x1Scale(d.x1) * Math.cos(0*Math.PI/5);

        let x2 = x2Scale(d.x2) * Math.cos(2*Math.PI/5);

        let x3 = x3Scale(d.x3) * Math.cos(4*Math.PI/5);

        let x4 = x4Scale(d.x4) * Math.cos(6*Math.PI/5);

        let x5 = x5Scale(d.x5) * Math.cos(8*Math.PI/5);

        switch(sum) {
            case 0:
                return (0);
            case 1:
                return -(x1);
            case 2:
                return -(x1 + x2);
            case 3:
                return -(x1 + x2 + x3);
            case 4:
                return -(x1 + x2 + x3 + x4);
            case 5:
                return -(x1 + x2 + x3 + x4 + x5);
            }
        
        // Moltiplichiamo per -1 perché l'asse delle ascisse di SVG va dall'alto verso il basso
        return -(x1+x2+x3+x4+x5);
    }

    var x1Scale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {return d.x1})])
        .range([0, 300]);

    var x2Scale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {return d.x2})])
        .range([0, 300]);

    var x3Scale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {return d.x3})])
        .range([0, 300]);

    var x4Scale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {return d.x4})])
        .range([0, 300]);

    var x5Scale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {return d.x5})])
        .range([0, 300]);

    let axis1Generator = d3.axisTop(x1Scale);
    let axis2Generator = d3.axisTop(x2Scale);
    let axis3Generator = d3.axisTop(x3Scale);
    let axis4Generator = d3.axisTop(x4Scale);
    let axis5Generator = d3.axisTop(x5Scale);

    var axis1 =  svg.append("g")
                .attr("class", "axis 1")
                .attr("transform", "rotate(-90)")
                .call(axis1Generator);

    var axis2 =  svg.append("g")
                .attr("class", "axis 2")
                .attr("transform", "rotate(-18)")
                .call(axis2Generator);

    var axis3 =  svg.append("g")
                .attr("class", "axis 3")
                .attr("transform", "rotate(54)")
                .call(axis3Generator);

    var axis4 =  svg.append("g")
                .attr("class", "axis 4")
                .attr("transform", "rotate(126)")
                .call(axis4Generator);

    var axis5 =  svg.append("g")
                .attr("class", "axis 5")
                .attr("transform", "rotate(198)")    
                .call(axis5Generator);

    svg.append("text")
        .attr("class", "x1 label")
        .attr("y", (315))
        .attr("transform", "rotate(0)")
        .attr('transform', 'translate(' + -10 + ',' + -620 + ')')
        .text("x1")
        .style('fill', 'red')
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        .style('font-size', 18);

    svg.append("text")
        .attr("class", "x2 label")
        .attr("y", (315))
        .attr("transform", "rotate(0)")
        .attr('transform', 'translate(' + 290 + ',' + -410 + ')')
        .text("x2")
        .style('fill', 'green')
        .style('stroke', 'black')
        .style('stroke-width', 0.3)        
        .style('font-size', 18);

    svg.append("text")
        .attr("class", "x3 label")
        .attr("y", (315))
        .attr("transform", "rotate(0)")
        .attr('transform', 'translate(' + 180 + ',' + -65 + ')')
        .text("x3")
        .style('fill', 'blue')
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        .style('font-size', 18);
        
    svg.append("text")
        .attr("class", "x4 label")
        .attr("y", (315))
        .attr("transform", "rotate(0)")
        .attr('transform', 'translate(' + -195 + ',' + -65 + ')')
        .text("x4")
        .style('fill', 'pink')
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        .style('font-size', 18);

    svg.append("text")
        .attr("class", "x5 label")
        .attr("y", (315))
        .attr("transform", "rotate(0)")
        .attr('transform', 'translate(' + -295 + ',' + -410 + ')')
        .text("x5")
        .style('fill', 'yellow')
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        .style('font-size', 18);
            
    var points = svg.selectAll(".points").data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return vector_sum_x(d); })
        .attr("cy", function(d) { return vector_sum_y(d); })
        .attr("r", 5)
	    .attr("fill", "green")
	    .attr("stroke-width", "2")
	    .attr("stroke", "black")
        .attr("class", "points")
        .on("click", function(i, d) {
            console.log(d);
            svg.selectAll(".line").remove();
            var colors = ["red", "green", "blue", "pink", "yellow"];
            colors.forEach( function(color, i)
            {
                var path = svg
                .append("path")
                .attr("class", "line")
                .style("stroke", color)
                .style("stroke-width", 4)
                .style("fill", "none")
                .attr("d", "M" + (vector_sum_x(d, i)).toString() + "," + (vector_sum_y(d, i)).toString() +
                    "L" + (vector_sum_x(d, i+1)).toString() + "," + (vector_sum_y(d,i+1)).toString());
                
                var totalLength = path.node().getTotalLength();
                
                path
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(1000)
                    //.ease("linear")
                    .attr("stroke-dashoffset", 0);
            });
        });
});
