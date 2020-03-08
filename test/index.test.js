'use strict';
var assert = require('assert')

var plus = require('../src/curry/index')

describe('闭包应用',function(){
  it('plus(0) === 0',function(){
    assert.equal(0,plus(0).toString())
  })
  it('plus(1)(1)(2)(3)(5) === 12',function(){
    assert.equal(12,plus(1)(1)(2)(3)(5).toString())
  })
  it('plus(1)(4)(2)(3) === 10',function(){
    assert.equal(10,plus(1)(4)(2)(3).toString())
  })
  it('方法引用',function(){
    var plus2 = plus(1)(1)
    assert.equal(12,plus2(1)(4)(2)(3).toString())
  })
})
