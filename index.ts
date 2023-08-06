import { interval, of } from 'rxjs';
import { take, concatAll } from 'rxjs/operators';

const inputObj = {
  o1: { iTime: 1000, qtyOutput: 5 },
  o2: { iTime: 500, qtyOutput: 2 },
  o3: { iTime: 1000, qtyOutput: 1 },
};

// old
// const obs1 = interval(1000).pipe(take(5));
// const obs2 = interval(500).pipe(take(2));
// const obs3 = interval(2000).pipe(take(1));

// new
const obs1 = interval(1000).pipe(take(5));
const obs2 = interval(500).pipe(take(2));
const obs3 = interval(2000).pipe(take(1));

//emit three observables
const source = of(obs1, obs2, obs3);
//subscribe to each inner observable in order when previous completes
const example = source.pipe(concatAll());
/*
  output: 0,1,2,3,4,0,1,0
  How it works...
  Subscribes to each inner observable and emit values, when complete subscribe to next
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe((val) => console.log(val));
