import { Subject, Observable } from 'rxjs';

let numApiCalling = 0;
let numApiSuccess = 0;
let isClick = false;
let timer
const subject = new Subject<number>();

const callApi1 = () => {
  numApiCalling++;
  const observable = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next(1);
      subscriber.complete();
    }, 500);
  });

  observable.subscribe({
    next(x) {
      subject.next(1);
    },
    error(err) {
      console.error('something wrong occurred: ' + err);
    },
    complete() {
      console.log('done');
    },
  });
};

const callApi2 = () => {
  numApiCalling++;
  const observable = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next(1);
      subscriber.complete();
    }, 1000);
  });

  observable.subscribe({
    next(x) {
      subject.next(1);
    },
    error(err) {
      console.error('something wrong occurred: ' + err);
    },
    complete() {
      console.log('done');
    },
  });
};

const isSuccess = () => {
  return numApiSuccess == numApiCalling;
};

const observer = {
  next: (x) => {
    numApiSuccess++;
    console.log('x', x);
    if (isClick) {
      if (isSuccess()) {
        console.log('success');
        clearTimeout(timer)
      }
    }
  },
  error: (err) => console.error('Observer got an error: ' + err),
};

const subscription = subject.subscribe(observer);

const clickBtn = () => {
  clearTimeout(timer)
  isClick = true;
  if (isSuccess()) {
    console.log('click success');
    return;
  }
  timer = setTimeout(() => {
    // subscription.unsubscribe;
    console.log('timeout');
    return;
  }, 1001);
};

callApi1();
callApi2();

setTimeout(() => {
  clickBtn();
}, 1002);
