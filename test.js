

let wrappedShapes = [
    {closestDifference: 1, leftTopCornerDist: 0.5},
    {closestDifference: 2, leftTopCornerDist: 0.7},
    {closestDifference: 2, leftTopCornerDist: 0.8},
    {closestDifference: 3, leftTopCornerDist: 0.8},
    {closestDifference: 1, leftTopCornerDist: 0.9},
    {closestDifference: 1, leftTopCornerDist: 0.1},
    {closestDifference: 1, leftTopCornerDist: 0.7},
    {closestDifference: 1, leftTopCornerDist: 0.7},

]
wrappedShapes.sort((a, b) => { //sorting by 2 criteria, shapes with same closestDiff will be sorted by how close they are to top left corner
	if (a.closestDifference === b.closestDifference) {
		return a.leftTopCornerDist - b.leftTopCornerDist
	}
	
	return a.closestDifference - b.closestDifference
});

console.warn(wrappedShapes)

const getDifference = (pointA, pointB) => {
    const a = pointA.CenterX - pointB.CenterX
 	const b = pointA.CenterY - pointB.CenterY
 	return Math.hypot(a, b);
}
// const shouldBeCloser = {CenterX: 5.641, CenterY: -1.994}
// const shouldBeFurther = {CenterX: 6.641, CenterY: -2.994 }
// const current =  {CenterX: 6.641, CenterY: -1.994 }
// console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeCloser))
// console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeFurther))

// console.warn(getDifference(current, shouldBeCloser), 'shouldBeCloser') // math rounding problem
// console.warn(getDifference(current, shouldBeFurther), 'shouldBeFurther') // math rounding problem

const shouldBeCloser = {CenterX: 3.747, CenterY: 7.686}   
const shouldBeFurther = {CenterX: 2.747, CenterY: 6.686 }
//const current =  {CenterX: 2.747, CenterY: 6.686 }   
console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeCloser))
console.warn(getDifference({CenterX: 0, CenterY: 11}, shouldBeFurther))

//console.warn(getDifference(current, shouldBeCloser), 'shouldBeCloser') // math rounding problem
//console.warn(getDifference(current, shouldBeFurther), 'shouldBeFurther') // math rounding problem

