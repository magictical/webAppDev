function average(arr) {
    //초기화 꼭하자 NaN에러난다
    var sum = 0;
    for(var i =0; i < arr.length; i++) {
        sum += arr[i];
    }
    console.log(Math.round(sum/arr.length));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores); //should return 94

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2); //should return 68



