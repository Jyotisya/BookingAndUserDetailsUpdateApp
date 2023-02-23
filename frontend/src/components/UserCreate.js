import React from 'react'
import { useState,useEffect } from 'react';

function UserCreate() {
  return (
    <div>
        <form>
            <div>
                <label>Name
                </label>
                <input type="text"/>
            </div>
            <div>
                <label>DOB
                </label>
                <input type="text"/>
            </div>
            <div>
                <label>TOB
                </label>
                <input type="text"/>
            </div>
            <div>
                <label>COB
                </label>
                <input type="text"/>
            </div>
            <div>
                <label>SOB
                </label>
                <input type="text"/>
            </div>
            <div>
                <label>image
                </label>
                <input type="file"/>
            </div>
        </form>
    </div>
  )
}

export default UserCreate