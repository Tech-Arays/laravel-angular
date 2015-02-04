// JavaScript Document
<!--
var IE = document.all?true:false
if (!IE) document.captureEvents(Event.MOUSEMOVE)

document.onmousemove = getMouseXY;

var tempX = 0;
var tempY = 0;

function getMouseXY(e)
{
	if(IE)
	{
		tempX = event.clientX + document.body.scrollLeft;
		tempY = event.clientY + document.body.scrollTop;
	}
	else
	{
		tempX = e.pageX;
		tempY = e.pageY;
	}
	if(tempX<0)
	{	tempX = 0;	}
	if(tempY<0)
	{	tempY = 0;	}
	return true;
}

function getMousePos(event)
{
	var currX,currY;
	if(document.all)
	{
		currX=event.clientX + document.body.scrollLeft;
		currY=event.clientY + document.body.scrollTop;
	}
	else
	{
		currX= event.pageX;
		currY= event.pageY;
	}
	
	if(currX<0)
	{	currX=0;	}
	if(currY<0)
	{	currY=0;	}
	return new Array(currX,currY);
}

function changeAction(trgtForm,trgtAction,submitIt,newTrgt)
{
	var trgt=document.getElementById(trgtForm);
	trgt.action=trgtAction;
	if((newTrgt!=null)&&(newTrgt!=''))
	{	trgt.target=newTrgt;	}
	
	if(submitIt==true)
	{	trgt.submit();	}
}

function getEleInfo(trgtId,reqd)
{
	if(document.getElementById(trgtId)!=null)
	{
		if(reqd=='value')
		{	return document.getElementById(trgtId).value;	}
		else if(reqd=='checked')
		{	return document.getElementById(trgtId).checked;	}
		else
		{	return document.getElementById(trgtId).getAttribute(reqd);	}
	}
	else
	{
		alert("Object not fount :: ".trgtId);
	}
}

function setEleInfo(trgtId,setWhat,val)
{
	var trgt=document.getElementById(trgtId);
	if(setWhat=='value')
	{	trgt.value=val;	}
	else if(setWhat=='checked')
	{	trgt.checked=val;	}
	else if(setWhat=='innerHTML')
	{	trgt.innerHTML=val;	}
	else
	{	trgt.setAttribute(setWhat,val);	}
}

var ttlCnt=0;
function doSel(pre,trgt)
{
	if(document.getElementById(pre+'['+trgt+']').checked==true)
	{
		if(document.getElementById('sel'+pre).value.indexOf(document.getElementById(pre+'['+trgt+']').value)==-1)
		{
			//Adding Id to Hidden
			if(document.getElementById('sel'+pre).value!="")
			{	document.getElementById('sel'+pre).value=document.getElementById('sel'+pre).value + ",";	}
			document.getElementById('sel'+pre).value= document.getElementById('sel'+pre).value + "'" + document.getElementById(pre+'['+trgt+']').value +"'";
		}
	}
	else if(document.getElementById(pre+'['+trgt+']').checked==false)
	{			
		//Removing Name from TextArea
		document.getElementById('sel'+pre).value=document.getElementById('sel'+pre).value.replace(",'"+document.getElementById(pre+'['+trgt+']').value+"'",'');
		document.getElementById('sel'+pre).value=document.getElementById('sel'+pre).value.replace("'"+document.getElementById(pre+'['+trgt+']').value+"'",'');
		if(document.getElementById('sel'+pre).value.indexOf(',')==0)
		{
			document.getElementById('sel'+pre).value=document.getElementById('sel'+pre).value.substr(1,document.getElementById('sel'+pre).value.length);
		}
	}
	//alert(document.getElementById('sel'+pre).value);
}

function doSelAll(pre)
{
	ttlCnt=document.getElementById('ttlCntField').value;
	if(document.getElementById('selAll').checked==true)
	{
		for(i=0;i<ttlCnt;i++)
		{
			document.getElementById(pre+'['+i+']').checked=true;
			doSel(pre,i);
		}
	}
	else if(document.getElementById('selAll').checked==false)
	{
		for(i=0;i<ttlCnt;i++)
		{
			document.getElementById(pre+'['+i+']').checked=false;
			doSel(pre,i);
		}
	}
}

function toogleDisplay(trgtId,displ,top,left)
{
	var trgt=document.getElementById(trgtId);
	if((trgt=='undefined')||(trgt==null))
	{	return;	}
	
	var show=displ;
	if(displ==null)
	{
		show=(document.getElementById(trgtId).style.display=='block')?0:1;
	}
	if(show==1)
	{
		document.getElementById(trgtId).style.display='block';
		if((top!='undefined')&&(top!=null)&&(left!='undefined')&&(left!=null))
		{
			document.getElementById(trgtId).style.top=top+'px';
			document.getElementById(trgtId).style.left=left+'px';
		}
	}
	else if(show==0)
	{	document.getElementById(trgtId).style.display='none';	}
}

function lmtChars(trgtId,lmt)
{
	if(document.getElementById(trgtId).value.length>=lmt)
	{
		document.getElementById(trgtId).value=document.getElementById(trgtId).value.substr(0,lmt-1);
	}
}

function populate(trgtId,lmt)
{
	var trgt=document.getElementById(trgtId);
	trgt.options.length=0;
	for(i=1;i<=lmt;i++)
	{	trgt.options[i-1]=new Option(i,i);	}
}

function getCharCode(event)
{
	return event.keyCode;
}

function changeCssClass(theClass,element,value)
{
	var cssRules;
	if (document.all)
	{
		cssRules = 'rules';
	}
	else if (document.getElementById)
	{
		cssRules = 'cssRules';
	}
	for (var S = 0; S < document.styleSheets.length; S++)
	{
		for (var R = 0; R < document.styleSheets[S][cssRules].length; R++)
		{
			if (document.styleSheets[S][cssRules][R].selectorText == theClass)
			{
				document.styleSheets[S][cssRules][R].style[element] = value;
			}
		}
	}	
}

function closeMe()
{
	var win=window.open('','_self','');
	win.opener=win;
	win.close();
}

function moveWithScroll(trgtId,baseTop,baseLeft)
{
	var position = [0, 0];
	if (typeof window.pageYOffset != 'undefined')
	{
		position = [	window.pageXOffset,	window.pageYOffset	];
	}
	else if (typeof document.documentElement.scrollTop!= 'undefined' && document.documentElement.scrollTop > 0)
	{
		position = [	document.documentElement.scrollLeft,	document.documentElement.scrollTop	];
	}
	else if (typeof document.body.scrollTop != 'undefined')
	{
		position = [	document.body.scrollLeft,	document.body.scrollTop	];
	}
	document.getElementById(trgtId).style.left=(baseTop + position[0]) + 'px';
	document.getElementById(trgtId).style.top=(baseLeft + position[1]) + 'px';
	
	window.setTimeout("moveWithScroll('"+trgtId+"',"+baseTop+","+baseLeft+")",250);
}

//Cookie Functions Begin
function createCookie(name,value,time) 
{
	document.cookie = name+"="+value+"; expires="+time+"; path=/";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}
//Cookie Functions End

function displayIfFound(trgtId,trgtBlockId,checkId)
{
	var check=document.getElementById(checkId);
	var trgt=document.getElementById(trgtId);
	var lmt=trgt.options.length;
	var notReqd=0;
	for(i=0;i<lmt;i++)
	{	trgt.options[i].selected=false;
		if(trgt.options[i].title!=check.value)
		{	trgt.options[i].style.display='none';	++notReqd;	}
		else
		{	trgt.options[i].style.display='block';	}
	}
	
	if(lmt==notReqd)
	{	document.getElementById(trgtBlockId).style.display='none';	}
	else
	{	document.getElementById(trgtBlockId).style.display='block';	}
}

function throwError(trgtBlock,content)
{
	document.getElementById(trgtBlock).innerHTML=content;
}

function redirector(trgt,begin,end)
{
	if(begin<end)
	{
		++begin;
		window.setTimeout('redirector("'+trgt+'",'+begin+','+end+');',1000);
	}
	else if(being>=end)
	{	top.location.href=trgt;	}
}

function swapImage(trgtId,imgSrc)
{  
	document.getElementById(trgtId).src=imgSrc;	
}

function swapBgImage(trgtId,imgSrc)
{
	document.getElementById(trgtId).style.backgroundImage='url('+imgSrc+')';
}

function findPosX(obj)
{
	var curleft = 0;
	if(obj.offsetParent)
		while(1) 
		{
		  curleft += obj.offsetLeft;
		  if(!obj.offsetParent)
			break;
		  obj = obj.offsetParent;
		}
	else if(obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if(obj.offsetParent)
		while(1)
		{
		  curtop += obj.offsetTop;
		  if(!obj.offsetParent)
			break;
		  obj = obj.offsetParent;
		}
	else if(obj.y)
		curtop += obj.y;
	return curtop;
}

function swapObjImage(trgt,imgSrc,trgtType)
{
	if(trgtType=='btn')
	{	trgt.style.backgroundImage='url('+imgSrc+')';	}
	else
	{	trgt.src=imgSrc;	}
}
function trimIt(trgt)
{
	return trgt.replace(/^\s+|\s+$/g, "");
}
function checkEmpty(value)
{
	j=0;
	for(i=0;i<value.length;i++)
	{
		if(trimIt(value[i])=="" || trimIt(value[i])==null )
		{
			j++;
		}
	}
	if(j==value.length)
	{
		return false;
	}
}
function checkOne(name,obj)
{
	var length=document.getElementsByName(name).length;
	for(var i=0;i<length;i++)
	{
		document.getElementsByName(name)[i].checked=false;
	}
	obj.checked=true;
}

function singleChecked(pre,cnt,trgt)
{
	var i=0;
	for(i=0; i<cnt; i++)
	{	document.getElementById(pre+i).checked = false;	}
	document.getElementById(pre+trgt).checked=true;
}

function atLeastOneChecked(pre,cnt,trgt)
{
	var i=0;
	for(i=0; i<cnt; i++)
	{
		if(document.getElementById(pre+i).checked == true)
		{	return true;	}
	}
	document.getElementById(pre+trgt).checked = true;
	return false;
}

function atLeastOneNonZero(collec)
{
	var i=0;
	for(i in collec)
	{
		if(document.getElementById(collec[i]).value > 0)
		{	return true;	}
	}
	document.getElementById(collec[0]).value = '1';
}
function doCheckAll(name,obj)
{
	
	var collec = document.getElementsByName(name);

	for(var i=0; i<collec.length; i++)
	{
		collec[i].checked = obj.checked;
	}
}
function alertSize() 
{
  var myWidth = 0, myHeight = 0;
  var ofWidth=0, ofHeight=0;
  if( typeof( window.innerWidth ) == 'number' ) {
	//Non-IE
	myWidth = window.innerWidth;
	myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	//IE 6+ in 'standards compliant mode'
	myWidth = document.documentElement.clientWidth;
	myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	//IE 4 compatible
	myWidth = document.body.clientWidth;
	myHeight = document.body.clientHeight;
  }
    var position = [0, 0];
	if (typeof window.pageYOffset != 'undefined')
	{
		position = [
		window.pageXOffset,
		window.pageYOffset
		];
	}
	else if (typeof document.documentElement.scrollTop!= 'undefined' && document.documentElement.scrollTop > 0)
	{
		position = [
		document.documentElement.scrollLeft,
		document.documentElement.scrollTop
		];
	}
	else if (typeof document.body.scrollTop != 'undefined')
	{
		position = [
		document.body.scrollLeft,
		document.body.scrollTop
		];
	}
	if(position[0]>20)
	{
		position[0]=position[0]-20;
	}
	else
	{
		position[0]=0;
	}
	if(position[1]>20)
	{
		position[1]=position[1]-20;
	}
	else
	{
		position[1]=0;
	}

  return Array(myWidth,myHeight,position[0],position[1]);
}
function showDivAtCenter(divid) 
{
	var scrolledX, scrolledY;
	if( self.pageYoffset )
	{
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} 
	else if( document.documentElement && document.documentElement.scrollTop ) 
	{
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} 
	else if( document.body ) 
	{
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}
	var centerX, centerY;
	if( self.innerHeight ) 
	{
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} 
	else if( document.documentElement && document.documentElement.clientHeight ) 
	{
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	}
	else if( document.body ) 
	{
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}
	Xwidth=$('#'+divid).width();
	Yheight=$('#'+divid).height();
	
	var leftoffset = scrolledX + (centerX - Xwidth) / 2;
	var topoffset = scrolledY + (centerY - Yheight) / 2;
	
	var o=document.getElementById(divid);
	var r=o.style;
	
	r.top = topoffset + 'px';
	r.left = leftoffset + 'px';
	r.display = "block";
}
// -->
