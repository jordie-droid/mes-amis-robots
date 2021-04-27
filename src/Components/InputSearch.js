import React from 'react';

export default function InputSearch(props){
    return <input type="search" placeholder="Rechercher par le nom" onChange={props.onChange}/>
}