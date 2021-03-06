function _filter(list, predi) {
    var new_list = [];
    _each(list, function(val) {
        if(predi(val))  
            new_list.push(val);
    });

    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function(val) {
        new_list.push(mapper(val));
    });
    
    return new_list;
}

var _get = _curryR(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

function _isObject(obj) {
    return typeof obj == 'object' && !!obj;
}
function _keys(obj) {
    return _isObject(obj) ? Object.keys(obj) : [];
}

var _length = _get('length');
function _each(list, iter) {
    var keys = _keys(list);
    // for (var II = 0, len = _length(list); II < len; II++) {    
    //     iter(list[II]);
    // }

    for (var II = 0, len = keys.length; II < len; II++) {
        iter(list[keys[II]]);
    }

    return list;
}

function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b): function(b) { return fn(a, b); }                 
    }
}

function _curryR(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b): function(b) { return fn(b, a); }       
    }
}

function _pipe() {
    var fns = arguments;
    return function(arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);                            
        }, arg);
    }
}

function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}

var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2){
        memo = list[0];
        list = _rest(list);
    }

    _each(list, function(val) {
        memo = iter(memo, val);
    });

    return memo;
}

var _map = _curryR(_map),
 _filter = _curryR(_filter);


 


