

// let wrappedShapes = [
//     {closestDifference: 1, leftTopCornerDist: 0.5},
//     {closestDifference: 2, leftTopCornerDist: 0.7},
//     {closestDifference: 2, leftTopCornerDist: 0.8},
//     {closestDifference: 3, leftTopCornerDist: 0.8},
//     {closestDifference: 1, leftTopCornerDist: 0.9},
//     {closestDifference: 1, leftTopCornerDist: 0.1},
//     {closestDifference: 1, leftTopCornerDist: 0.7},
//     {closestDifference: 1, leftTopCornerDist: 0.7},

// ]
// wrappedShapes.sort((a, b) => { //sorting by 2 criteria, shapes with same closestDiff will be sorted by how close they are to top left corner
// 	if (a.closestDifference === b.closestDifference) {
// 		return a.leftTopCornerDist - b.leftTopCornerDist
// 	}
	
// 	return a.closestDifference - b.closestDifference
// });

const pHeight = 11;

//console.warn(wrappedShapes)

const getDifference = (pointA, pointB) => {
    const a = pointA.CenterX - pointB.CenterX
 	const b = pointA.CenterY - pointB.CenterY
 	return +Math.hypot(a, b).toFixed(4);  // helpful for almost equal numbers and js rounding problem
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

const getAngleDiffFromCenter = (a, b) => {
	const angleA = calcAngle(averageCenter, a);
	const angleB = calcAngle(averageCenter, b);
	let angleDiff = angleB - angleA;

     if (angleDiff < 0) angleDiff = 360 + angleDiff;

	// return 360 - angleDiff;
	return angleDiff;
}

const averageCenter = {CenterX: 9.293033095472442 , CenterY: 1.29277448332677166};
// const startingPoint = {CenterX: 4.076 , CenterY: 7.159}
// const wrongTarget = {CenterX: 5.761 , CenterY: 5.42}
// const shouldBeNext = {CenterX: 5.734 , CenterY: 9.424}
const startingPoint = {CenterX: 10.288 , CenterY: -5.681}
const wrongTarget = {CenterX: 10.442 , CenterY: -3.126}
const shouldBeNext = {CenterX: 12.969 , CenterY: -5.608}
const wrongAngle = getAngleDiffFromCenter(startingPoint, wrongTarget)
const wrongDist = getDifference(startingPoint, wrongTarget)

const rightAngle = getAngleDiffFromCenter(startingPoint, shouldBeNext)
const rightDist = getDifference(startingPoint, shouldBeNext)

console.warn({total: wrongDist * wrongAngle, wrongAngle, wrongDist,  wrongTarget})
console.warn({total: rightDist * rightAngle, rightAngle, rightDist, shouldBeNext})

// const shouldBeCloser = {CenterX: 5.641, CenterY: -1.994}
// const shouldBeFurther = {CenterX: 6.641, CenterY: -2.994 }
// const current =  {CenterX: 6.641, CenterY: -1.994 }
// console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeCloser))
// console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeFurther))

// console.warn(getDifference(current, shouldBeCloser), 'shouldBeCloser') // math rounding problem
// console.warn(getDifference(current, shouldBeFurther), 'shouldBeFurther') // math rounding problem

//const shouldBeCloser = {CenterX: 3.747, CenterY: 7.686}   
//const shouldBeFurther = {CenterX: 2.747, CenterY: 6.686 }
//const current =  {CenterX: 2.747, CenterY: 6.686 }   
//console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeCloser))
//console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeFurther))

//console.warn(getDifference(current, shouldBeCloser), 'shouldBeCloser') // math rounding problem
//console.warn(getDifference(current, shouldBeFurther), 'shouldBeFurther') // math rounding problem

