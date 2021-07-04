
const Shapes = host.ActivePage.ActiveLayer.Shapes
const shapesCount = Shapes.Count;
alert([host.ActivePage.ActiveLayer.Name, `Reordering ${shapesCount} Shapes`])
let objectsIndices = Array.from(Array(shapesCount).keys())


let wrappedShapes = objectsIndices.map(index => {
    const shape = Shapes.Item(index + 1);
	const {CenterX, CenterY, ZOrder} = shape
    return {CenterX, CenterY, ZOrder, shape }
});


const getClosestShape = (shapes, currShape) => {
	const excludedShapes = shapes.filter(a => a.ZOrder !== currShape.ZOrder);
	const distanceToShapes = excludedShapes.map(target =>  { return {diff: getDifference(currShape, target), closestShape: target}});
	const [target]= distanceToShapes.sort((a,b) => a.diff - b.diff);
	
    return target
}

const getDifference = (pointA, pointB) => {
    const a = pointA.CenterX - pointB.CenterX
 	const b = pointA.CenterY - pointB.CenterY
 	return Math.hypot(a, b);
}

wrappedShapes.forEach(obj => {
    const {diff} = getClosestShape(wrappedShapes, obj)
	obj.closestDifference = diff;
});

wrappedShapes.sort((a, b) => a.closestDifference - b.closestDifference);

const smallestDistShape = wrappedShapes[0];

const getNextShape = (currShape, shapes, count = 0) => {
    const excludedShapes = shapes.filter(s => s.ZOrder !== currShape.ZOrder);

    currShape.count = count;
    if (!excludedShapes.length) return;

    const {closestShape} = getClosestShape(excludedShapes, currShape)
    getNextShape(closestShape, excludedShapes, ++count)
}

getNextShape(smallestDistShape, wrappedShapes);

wrappedShapes.sort((a, b) => a.count - b.count);


wrappedShapes.forEach(obj => {
	obj.shape.OrderToBack()
})




