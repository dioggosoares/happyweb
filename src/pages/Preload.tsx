import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Preload() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('@HappyApi:token');
    if(token){

      history.push('/dashboard/registered');

    }else{
      history.push('/signin');
    }

  }, [history]);

  return (
    <div></div>
  )
}
