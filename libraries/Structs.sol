// SPDX-License-Identifier: MIT
// Created by ZENODE (zenodeapp - https://github.com/zenodeapp/)

/**********************************************************************************
* MIT License                                                                     *
* Copyright (c) 2022 ZENODE                                                       *
*                                                                                 *
* Permission is hereby granted, free of charge, to any person obtaining a copy    *
* of this software and associated documentation files (the "Software"), to deal   *
* in the Software without restriction, including without limitation the rights    *
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell       *
* copies of the Software, and to permit persons to whom the Software is           *
* furnished to do so, subject to the following conditions:                        *
*                                                                                 *
* The above copyright notice and this permission notice shall be included in all  *
* copies or substantial portions of the Software.                                 *
*                                                                                 *
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR      *
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,        *
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE     *
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER          *
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,   *
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE   *
* SOFTWARE.                                                                       *
**********************************************************************************/

pragma solidity ^0.8.17;

library Structs {
  struct Matrix {
    // MATRIX_ID
    string id;

    // The 2D array for the matrix
    int[][] grid; 

    // The ALPHABET_ID this matrix is linked to
    string alphabetId;

    // An index for where this matrix is stored in the matrices-array (only useful for the CRUD)
    uint index;
  }

  struct Alphabet {
    // ALPHABET_ID
    string id; 

    // a list of the alphabet's characters in bytes-representation
    /* NOTE: read about bytes to string conversion if you want to get its alphabetical-value back.
             In Javascript you could use: String.fromCharCode(parseInt(CHAR_IN_BYTES)); */
    bytes1[] array;
    
    // how many times this alphabet is linked to a matrix
    uint usage; 
    
    // an index for where this alphabet is stored in the alphabets-array (only useful for the CRUD)
    uint index;
  }
}