import React from 'react'
import manImage from '../../assets/aboutPageImage.jpg'

function About() {
  return (
    <div className='flex gap-24'>
      <img className='w-128' src={manImage} />
      <div className='flex flex-col justify-center pr-14'>
        <h1 className='text-5xl font-bold text-stone-800 pb-6'>About us</h1>
        <p className='text-lg text-stone-800'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto laboriosam odit fugit saepe beatae ipsam obcaecati harum iure exercitationem animi ipsa, recusandae quae laborum aspernatur error aliquam explicabo nobis repellat.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, explicabo. Laboriosam, corporis neque! At vel laudantium perferendis illum aliquid perspiciatis quas ab itaque dolorum quod, est sed dolorem accusamus quia?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at ipsum numquam provident mollitia facilis et deserunt. Obcaecati, eligendi, beatae eum dicta vero quidem id, hic quae fugiat possimus culpa?
        </p>
      </div>
    </div>
  )
}

export default About