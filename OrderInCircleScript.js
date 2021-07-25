
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


// const getClosestShape = (shapes, currShape) => {
// 	const excludedShapes = shapes.filter(a => a.ZOrder !== currShape.ZOrder);
// 	const distanceToShapes = excludedShapes.map(target => { return {diff: getDifference(currShape, target), closestShape: target}});
// 	const [target]= distanceToShapes.sort((a,b) => {
	
// 		if (a.diff === b.diff) {
// 			return b.closestShape.CenterX - a.closestShape.CenterX
// 		}
		
// 		return a.diff - b.diff
// 	});
	
//     return target
// }

const getAngleDiffFromCenter = (a, b) => {
	const angleA = calcAngle(averageCenter, a);
	const angleB = calcAngle(averageCenter, b);
	let angleDiff = angleB - angleA;

    if (angleDiff < 0) angleDiff = 360 + angleDiff;

	// return 360 - angleDiff;
	return angleDiff;
}

const getOuterClosestShape = (shapes, currShape) => {
	const excludedShapes = shapes.filter(a => a.ZOrder !== currShape.ZOrder);
	const distanceToShapes = excludedShapes.map(target => {
		const angleDiffFromCenter = getAngleDiffFromCenter(currShape, target);
		return {
		// outerClosestDist: getDifference(currShape, target) * calcAngle(currShape, target),
		outerClosestDist: getDifference(currShape, target) * angleDiffFromCenter,
		outerClosestShape: target,
		diff: getDifference(currShape, target), // for debbug
		angle: angleDiffFromCenter, // for debbug
	}});

	
	const [target]= distanceToShapes.sort((a,b) => a.outerClosestDist - b.outerClosestDist);
	//alert(['outerClosestShape', target.outerClosestShape.shape.Name , 'outerClosestDist', target.outerClosestDist, 'diff', target.diff, 'angle', target.angle, 'currShape', currShape.shape.Name])
	
    return target
}


const calcAngle = (a, b) => {
	const dX = b.CenterX - a.CenterX;
	const dY = (pHeight - b.CenterY)  - (pHeight - a.CenterY);

	let angleInDegrees = Math.atan2(dY, dX) * 180 / Math.PI

    if (angleInDegrees < 0) angleInDegrees = 360 + angleInDegrees;

    angleInDegrees -= 270 // adjusting the 0 of 360 to be vertical top of element

    if (angleInDegrees < 0) angleInDegrees = 360 + angleInDegrees;


	return angleInDegrees;
}

const getAverageCenter = (objects) => {
	const totalPositions = objects.length;
	const totalPositionDistance = objects.reduce((result, obj) => {
		if (result.CenterX === undefined) {
			result.CenterX = 0
			result.CenterY = 0
		}
		result.CenterX += obj.CenterX
		result.CenterY += obj.CenterY

		return result;
	},  {})

	//alert([totalPositions, ])

	totalPositionDistance.CenterX = totalPositionDistance.CenterX / totalPositions;
	totalPositionDistance.CenterY = totalPositionDistance.CenterY / totalPositions;

	return totalPositionDistance
}


const getDifference = (pointA, pointB) => {
    const a = pointA.CenterX - pointB.CenterX
 	const b = pointA.CenterY - pointB.CenterY
 	return +Math.hypot(a, b).toFixed(4);  // helpful for almost equal numbers and js rounding problem
}

const getNextShape = (currShape, shapes, count = 0) => {
    const excludedShapes = shapes.filter(s => s.ZOrder !== currShape.ZOrder);

    currShape.count = count;
    if (!excludedShapes.length) return;

    const {outerClosestShape} = getOuterClosestShape(excludedShapes, currShape)
    getNextShape(outerClosestShape, excludedShapes, ++count)
}

wrappedShapes.forEach(shape => {
	shape.leftTopCornerDist = getDifference(shape, {CenterX: 0, CenterY: pHeight});
});

wrappedShapes.sort((a, b) => { 
	return a.leftTopCornerDist - b.leftTopCornerDist
});

const averageCenter = getAverageCenter(wrappedShapes);
alert([averageCenter.CenterX, averageCenter.CenterY])

const shapeClosestToCorner = wrappedShapes[0];

getNextShape(shapeClosestToCorner, wrappedShapes);

wrappedShapes.sort((a, b) => a.count - b.count);

wrappedShapes.forEach(obj => {
	obj.shape.OrderToBack()
});