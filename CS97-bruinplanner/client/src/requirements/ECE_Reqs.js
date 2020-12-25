import React from 'react'
// import './Reqs.css'





export default class ECEng extends React.Component {
  render(){
    return(
      <div>

      <h1>Electrical Engineering Major Requirements</h1>

      <h2>Lower Division Requirements</h2>
      <ul>
        <li>COM SCI: 1, 31, 32, 33, M51A or ECE M16</li>
        <li>CHEM 20A,20B; EC ENGR 2,3,10,11L</li>
        <li>MATH: 31A, 31B, 32A, 32B, 33A, 33B, 61</li>
        <li>PHYSICS: 1A, 1B, 1C, 4AL, 4BL</li>
      </ul>  

    <h2>Upper Division Requirements</h2>
    <ul>
      <li>EC ENGR 101A,102,110,111L,113,131A</li>
      <li>CS M151B or ECE M116C, CS M152A or ECE M116L</li>
      <li>2 Capstone: ECE or CSE Design Course</li>
      <li>6 Courses: ECE 100-187</li>
      <li>3 Courses: CS/ECE ENGR Electives</li>
      <li>3 Courses: HSEAS TECH BREADTH</li>
    </ul>  

    <h2>Writing and General Education Requirements</h2>
    <ul>
      <li>Writing I, Engineering Writing I, American History</li>
      <li>2 Courses: Phil/Ling or Visual/Arts or Lit/Cult GE</li>
      <li>Historical GE</li>
      <li>Social GE</li>
      <li>Life Science GE</li>
    </ul> 


    </div>
      )
  }
}