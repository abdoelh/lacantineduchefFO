import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID,inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const localData = localStorage.getItem("user");
    if(localData==="1"){
      return true;

    }else{
      router.navigate(['login']); // Redirect to login if the login is  unsuccessful
      return false
    }
  }
 // If not running in the browser environment, return true to allow access
  return true;
  
};
