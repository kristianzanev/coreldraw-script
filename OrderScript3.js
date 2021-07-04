//Calculate the page width and height, and store the values in pWidth and pHeight.
pWidth = host.ActivePage.SizeWidth

pHeight = host.ActivePage.SizeHeight


//alert("page width is: " + pWidth);
//alert("page height is: " + pHeight);
//alert("Page Size is: " + host.ActivePage.Paper);

//Create a new layer, called “New Watermark”, on the active page.
//let lr2 = host.ActivePage.CreateLayer("New Watermark");
//let l1 = host.ActivePage.Layers("Layer 1")
//let length = Object.values(host.ActivePage.Layers).length




const Shapes = host.ActivePage.ActiveLayer.Shapes
const shapesCount = Shapes.Count;
alert([host.ActivePage.ActiveLayer.Name, `Reordering ${shapesCount} Shapes`])
let objectsIndices = Array.from(Array(shapesCount).keys())


let objWithPos = objectsIndices.map(index => {
    const shape = Shapes.Item(index + 1);
	const {CenterX, CenterY, ZOrder} = shape
	const newY = CenterY
	const Hypot = Math.hypot(CenterX, newY)
    return {CenterX, CenterY: newY, ZOrder, Hypot, shape }
});

//objWithPos.sort((a, b) => a.Hypot - b.Hypot);
// const getClosestShape = (shapes, currShape) => {
//     const goal = currShape.Hypot;
// 	const excludedShapes = shapes.filter(a => a.ZOrder !== currShape.ZOrder);
// 	const closestShape = excludedShapes.reduce(function(prev, curr) {
//   	return (Math.abs(curr.Hypot - goal) < Math.abs(prev.Hypot - goal) ? curr : prev);
// 	});

//     return closestShape
// }
const getClosestShape = (shapes, currShape) => {
	const excludedShapes = shapes.filter(a => a.ZOrder !== currShape.ZOrder);
	const distanceToShapes = excludedShapes.map(target =>  { return {diff: getDifference(currShape, target), target}});
	const [{target}]= distanceToShapes.sort((a,b) => a.diff - b.diff);
	
    return target
}

const getDifference = (pointA, pointB) => {
    const a = pointA.CenterX - pointB.CenterX
 	const b = pointA.CenterY - pointB.CenterY
 	return Math.hypot(a, b);
}

objWithPos.forEach(obj => {
    const closestShape = getClosestShape(objWithPos, obj)
	obj.closestDifference =  getDifference(obj, closestShape);
	obj.closestShapeName = closestShape.shape.Name;
});

objWithPos.sort((a, b) => a.closestDifference - b.closestDifference);

const smallestDistShape = objWithPos[0];

const getNextShape = (currShape, shapes, count = 0) => {
    const excludedShapes = shapes.filter(s => s.ZOrder !== currShape.ZOrder);

    currShape.count = count;
    if (!excludedShapes.length) return;

    const closestShape = getClosestShape(excludedShapes, currShape)
    //alert(['currentShape', currShape.shape.Name, currShape.Hypot,'closestShape', closestShape.shape.Name, closestShape.Hypot])
    getNextShape(closestShape, excludedShapes, ++count)
}

getNextShape(smallestDistShape, objWithPos);

objWithPos.sort((a, b) => a.count - b.count);


//alert([smallestDistShape.shape.name, 'closest is', smallestDistShape.closestShapeName, smallestDistShape.closestDifference])


// const getClosestDifference = (shapes) => {
//     const targets = [].concat(shapes);

//     targets.sort((a, b) => {
//         const closestToA = getClosestShape(targets, a);
//         const closestToB = getClosestShape(targets, b);
//         return getDifference(a, closestToA) - getDifference(b, closestToB)
//     })

//     return targets[0];
// }

//const closestDiff = getClosestDifference(objWithPos)
//const test = getClosestShape(objWithPos, smallestDistShape)


objWithPos.forEach(obj => {
	// alert([obj.shape.name, obj.closestShapeName, obj.closestDifference])
	obj.shape.OrderToBack()
})




