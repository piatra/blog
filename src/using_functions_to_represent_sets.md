**Re: Using Functions to Represent Sets**

*This article is a reply to [Using Functions to Represent Sets][1]*

The gist of the article is that by using functions you get several advantages which I wanted to show again because I found them really interesting and also provide a similar implementation but this time in ClojureScript.

1 . __Infinite sets__

Using a predicate function such as `odd`

````
function odd (x) {
    return x % 2 
}
````
You can define infinite length sets. As long as `odd(x) => true` then x is contained by the set.

2 . __Constant time union and intersection__

For the union operation, given two sets we want we want to create a third set with all distinct elements from the two

````
function LT (value) { // given an upper limit
    return function (x) {
        return x < value // we want all the numbers which are less than our limit
    }
}

// usage
lessThanTen = LT(10);
lessThanTen(5); // true
lessThanTen(20); //false

function union (firstSet, secondSet) {
    return function (x) {
        return firstSet(x) || secondSet(x);
    }
}

// usage
thirdSet = union(odd, lessThanTen); // all numbers < 10 or which are odd
thirdSet(7) // true, 7 is odd and less than 10
thirdSet(2) // false
thirdSet(15) // true
````

### CLJS implementation

__The empty list__
````
(def void
    (fn [_] false))
````
We define it as the function that always returns false. No matter what element we want to test it definitly is not a part of this set. You can think of it as `[]`.

#### Insert
Then we want to augment this by adding elements.
```
(defn insert [e f] ;; an element and a set
  (fn [x] (or (= x e) (contains x f))))
  
;; the newly formed set has the following logic when checking
;; is it equal to the newly inserted element or is it part of the set ?
````
This insert fn receives an element and a set. It creates a __new function__ (a *new set*) that will compare any arguments it receives with the element `e` that it knows or pass it along to the set to verify (which will do the same thing until `void` is reached).

#### Union and intersection
Both operation are similar and result in a new set that either combines the elements from both sets or accepts only the elements that belong to both sets.

````
(defn union [f1 f2]
  (fn [x] (or (contains x f1) (contains x f2))))

(defn intersection [f1 f2]
  (fn [x] (and (contains x f1) (contains x f2))))
````

### Examples

````
(def void (fn [_] false)) ;; []
(def one (insert 1 void)) ;; [1]
(def two (insert 2 one)) ;; [1 2]
(def three (insert 3 (insert 2 one))) ;; [1 2 3]

(contains 3 three) // true

(defn gt [v] // creates sets with elements great than a certain limit
  (fn [x] (> x v)))

(def gtten (gt 10)) // all sets that contain numbers > 10

(contains 15 gtten) // true
(contains 3 (union even? gtten)) // false
````

You can see the full implementation [here][2]


  [1]: http://www.mihneadb.net/post/using-functions-to-represent-sets/
  [2]: https://www.refheap.com/20618