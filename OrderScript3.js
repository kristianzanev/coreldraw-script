
const Shapes = host.ActivePage.ActiveLayer.Shapes
const shapesCount = Shapes.Count;
alert([host.ActivePage.ActiveLayer.Name, `Reordering ${shapesCount} Shapes`])
let objectsIndices = Array.from(Array(shapesCount).keys())
const pWidth = host.ActivePage.SizeWidth
const pHeight = host.ActivePage.SizeHeight

let wrappedShapes = objectsIndices.map(index => {
    const shape = Shapes.Item(index + 1);
	const {CenterX, CenterY, ZOrder} = shape
    return {CenterX, CenterY, ZOrder, shape }
});


const getClosestShape = (shapes, currShape) => {
	const excludedShapes = shapes.filter(a => a.ZOrder !== currShape.ZOrder);
	const distanceToShapes = excludedShapes.map(target =>  { return {diff: getDifference(currShape, target), closestShape: target}});
	const [target]= distanceToShapes.sort((a,b) => {
	//return a.diff - b.diff
	
	if (a.diff === b.diff) {
		return a.leftTopCornerDist - b.leftTopCornerDist
	}
	
	return a.diff - b.diff
	});
		// for debugging purposes
	//if (target && target2) {
		// alert(['currShape', currShape.shape.Name, 'closest is',
		//  target.closestShape.shape.Name,target.closestShape.leftTopCornerDist, 
		//  target2.closestShape.shape.Name, target2.closestShape.leftTopCornerDist,
		//  'difference',
		//  target.closestShape.shape.Name,target.diff, 
		//  target2.closestShape.shape.Name, target2.diff,
		// ])
	//}
	
    return target
}

const getDifference = (pointA, pointB) => {
    const a = pointA.CenterX - pointB.CenterX
 	const b = pointA.CenterY - pointB.CenterY
 	return +Math.hypot(a, b).toFixed(4);  // helpful for almost equal numbers and js rounding problem
}

wrappedShapes.forEach(shape => {
    const {diff} = getClosestShape(wrappedShapes, shape)
	shape.closestDifference = diff;
	shape.leftTopCornerDist = getDifference(shape, {CenterX: 0, CenterY: pHeight});
	//alert(shape.leftTopCornerDist )
});

wrappedShapes.sort((a, b) => { //sorting by 2 criteria, shapes with same closestDiff will be sorted by how close they are to top left corner
	if (a.closestDifference === b.closestDifference) {
		return a.leftTopCornerDist - b.leftTopCornerDist
	}
	
	return a.closestDifference - b.closestDifference
});

const closestShape = wrappedShapes[0];
//const closestToLeftTopCorner = sameDiffShapes.find(shape => )

const getNextShape = (currShape, shapes, count = 0) => {
    const excludedShapes = shapes.filter(s => s.ZOrder !== currShape.ZOrder);

    currShape.count = count;
    if (!excludedShapes.length) return;

    const {closestShape} = getClosestShape(excludedShapes, currShape)
    getNextShape(closestShape, excludedShapes, ++count)
}

getNextShape(closestShape, wrappedShapes);

wrappedShapes.sort((a, b) => a.count - b.count);


wrappedShapes.forEach(obj => {
	obj.shape.OrderToBack()
})




