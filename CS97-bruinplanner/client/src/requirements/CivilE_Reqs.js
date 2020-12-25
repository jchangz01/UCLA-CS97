import React from 'react'
// import './Reqs.css'





export default class CivilEng extends React.Component {
  render(){
    return(
      <div>

      <h1>Civil Engineering Major Requirements</h1>

      <h2>Lower Division Requirements</h2>
      <ul>
        <li>Chemistry and Biochemistry 20A, 20B, 20L, Com Sci 31</li>
        <li>MATH: 31A, 31B, 32A, 32B, 33A, 33B</li>
        <li>PHYSICS: 1A, 1B, 1C,4AL, LIFE SCIENCE (1)</li>
      </ul>  

    <h2>Upper Division Requirements</h2>
    <ul>
      <li>MAE 105A, CEE 91, MAE 102,103,C104,108,110,120,135A,150,153,190</li>
      <li>5 Field Elective Courses: Materials, Environmental, Geotechnical</li>
      <li>2 Design courses (Capstone)</li>
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