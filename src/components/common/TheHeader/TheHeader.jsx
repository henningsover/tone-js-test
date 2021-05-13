import React from 'react'
import {NavLink} from 'react-router-dom'

export default function TheHeader({links}) {

  return (
    <div>
      <div>
        <h1>MasterThesis Tracker</h1>
      </div>
      <nav>
        <ul>
          {links &&
            Object.keys(links).map((link) => {
              return (
                <li>
                  {link.current?
                    <span>{link.title}</span>
                    :
                    <NavLink to={link.slug}>{link.title}</NavLink>
                  }
                </li>
              )
            })
          }
        </ul>
      </nav>
      <button>Log Out</button>
    </div>
  )
}
