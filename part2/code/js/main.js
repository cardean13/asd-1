//Yusef Hassan
//MIU 0512
//Project 3


$("#base").on("pageinit", function(){

    $("#csvbutton").on("click", function(){
    console.log("#csvbutton");
        $("#listview").empty();
            $.ajax({
                url:"xhr/data.csv",
                type: "GET",
                dataType: "csv",
                success: function(result){
                console.log(result);
                 /*   $.each(function(index, value){
                        $("<li>" + value.name + "</li>").appendTo("#listview");
                    });*/
                },
                error: function(result){
                    console.log(result);
                }
            });    
    });
    $("#jsonbutton").on("click", function(){
    console.log("jsonbutton");
        $("#listview").empty();
            $.ajax({
                url: "xhr/data.json",
                type: "GET",
                dataType: "json",
                success: function(result){
                	console.log("json data success of pull");
                    console.log(result);
                    $.each(result, function(){
                    	$.each(this, function(index, value){
			               console.log(value.fname[0], value.fname[1]);
			                $("<li><p>" + value.fname[0] + value.fname[1]+ "</p><p>" 
			                + value.lname[0] + value.lname[1] + "</p><p>" 
			                + value.dname[0] + value.dname[1] + "</p></li>").appendTo("#listview");
		                    });
					})
					$("#listview").listview("refresh");
                },
                error: function(result){
                    console.log(result);
                }
            });
    });
    $("#xmlbutton").on("click", function(){
    console.log("#xmlbutton");
        $("#listview").empty();
            $.ajax({
                url:"xhr/data.xml",
                type: "GET",
                dataType: "xml",
                success: function(result){
                console.log(result);
                    $.each(function(index, value){
                        $("<li>" + value.name + "</li>").appendTo("#listview");
                    });
                },
                error: function(result){
                    console.log(result);
                }
            });    
    });
    
});

var parseAccountInfo = function(data){
        console.log(data);
};

$("#addAccount").on("pageinit", function(){

    var aiform = $("#accountInfo"),
        reliableValue ="No",
        jobValue ="No",
        replaceValue ="No",
        trustValue ="No",
        sexValue,
        id = Math.floor(Math.random()*100000001),
        i = 0;
        
    function validate(){
        var aiform;    
        aiform.validate({
            invalidHandler: function (form, validator){},
            submitHandler: function(){
                var data = aiform.serializeArray();
            }
        });
    };
                
    function getSelectedRadio(){
        var radios = document.forms[0].sex;
        for( i=0; i<radios.length; i++){
            if(radios[i].checked){
                sexValue = radios[i].value;
            }
        }
    }
    
    function getCheckBoxValue(){
        if($("reliable").checked){
            reliableValue = $("reliable").value;
        }else{
            reliableValue = "No";
        }

        if($("job").checked){
            jobValue = $("job").value;
        }else{
            jobValue = "No";
        }

        if($("replace").checked){
            replaceValue = $("replace").value;
        }else{
            replaceValue = "No";
        }
       
        if($("trust").checked){
            trustValue = $("trust").value;
        }else{
            trustValue = "No";
        }
    }
    
    function toggleControls(n){
        switch(n){
            case "on":
                $("#foot").hide();
                $("#allInfo").show();
                $("#accountInfo").hide();
                $("#remove").show();
                $("#allAccounts").hide();
                $("#addAccount").show();
                break;
            case "off":
                $("#accountInfo").show();
                $("#remove").show();
                $("#allAccounts").show();
                $("#addAccount").hide();
                $("#items").hide();
                break;
            default:
                return false;
        }
    }

    function saveData(key){
        if(!key){
            id = Math.floor(Math.random()*100000001);
        }else{
            id = key;
        }
        
        getSelectedRadio();
        getCheckBoxValue();        
        var item = {};
            item.fname =["First Name:", $("#fname").val()];
            item.lname =["Last Name:", $("#lname").val()];
            item.sex =["Sex:", sexValue];
            item.age =["Age:", $("#ageRange").val()];
            item.reliable =["Is the borrower reliable?", reliableValue];
            item.job =["Do they have a job?", jobValue];
            item.replace =["If broken, could they replace it?", replaceValue];
            item.trust =["Do you fully trust them?", trustValue];
        //    item.group =["Group:", e("groups").value];
            item.dname =["Disc Name:", $("#dname").val()];
            item.value =["Value:", $("#value").val()];
            item.ldate =["Date Lent:", $("#ldate").val()];
            item.rdate =["Expected Return Date:", $("#rdate").val()];
            item.comments =["Anymore Information?", $("#comments").val()];

        localStorage.setItem(id, JSON.stringify(item));
        alert("Information Logged");
    }
    
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("No saved accounts, default data added.");
        }
            var contact = $('<li class="singleContact"></li>').appendTo("#allInfo");
            var key = localStorage.key();
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            for(var n in obj){
                $("<p>" + obj[n][0]+'</p>').appendTo(contact);
            }
        };
    function autoFillData(){
        for(var n in JSON){
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(JSON[n]));
        }
    }
    function getImage(catName, makeSubList){
        var imageLi = document.createElement("li");
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement("img");
        var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
        imageLi.appendChild(newImg);
    }

    function editItem(){
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        toggleControls("off");
        
        $("#fname").value = item.fname[1];
        $("#lname").value = item.lname[1];
        var radios = document.forms[0].sex;
        for(var i=0; i<radios.length; i++){
            if(radios[i].value == "Male" && item.sex[1] == "Male"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Female" && item.sex[1] == "Female"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        $("$ageRange").value = item.age[1];        
        
        if(item.reliable[1] == "Yes"){
            $("#reliable").setAttribute("checked", "checked");
        }
        if(item.job[1] == "Yes"){
            $("#job").setAttribute("checked", "checked");
        }
        if(item.replace[1] == "Yes"){
            $("#replace").setAttribute("checked", "checked");
        }
        if(item.trust[1] == "Yes"){
            $("#trust").setAttribute("checked", "checked");
        }
        $("#dname").value = item.dname[1];
        $("#value").value = item.value[1];
        $("#ldate").value = item.ldate[1];
        $("#rdate").value = item.rdate[1];
        $("#comments").value = item.comments[1];
        
        $(saveData).unbind("click", saveData);
        $("#submit").value = "Edit Contact";
        var editSubmit = $("#submit");
        $(editSubmit).on("click", validate);
        editSubmit.key = this.key;
    }
    
    function deleteItem(){
        var ask = confirm("Delete contact?");
        if (ask){
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("Contact not removed");
        }
    }
    
    function deleteData(){
        if(localStorage.legnth === 0){
            alert("Nothing to delete!");
        }else{
            localStorage.clear();
            alert("All accounts deleted.");
            window.location.reload();
            return false;
        }
    }
    
    function valid(){
        var getFname = $("#fname");
        var getLname = $("#lname");
        var getDname = $("#dname");
        
    //    errMsg.innerHTML = "";
            getFname.css = "1px solid black";
            getLname.css = "1px solid black";
            getDname.css = "1px solid black";

        var message = [];

        if(getFname.val === ""){
            var fnameError = "Please Type in First Name.";
                $("#fname").css({
                    borderColor: "#ff0000",
                    hight: "1px"
                });
            message.push(fnameError);    
        }
        if(getLname.value === ""){
            var lnameError = "Please Type in Last Name.";
                $("#lname").css({
                    borderColor: "#ff0000",
                    hight: "1px"
                });
            message.push(lnameError);    
        }
        if(getDname.value === ""){
            var dnameError = "Please Type in Disc Name.";
                $("#dname").css({
                    borderColor: "#ff0000",
                    hight: "1px"
                });
            message.push(dnameError);    
        } 
        if (message.length >= 1){
            for(var i=0, j=message.length; i < j; i++){
                var text = $("li");
                text.html = message[i];
//                errMsg.appendChild(text);
            }
            alert(message);
            return false;
        }else{
            saveData(this.key);
        }
    } 
    //links and submit button
    $("#remove").on("click", deleteData);
    $("#allAccounts").on("click", getData);
    $("#submit").on("click", valid);
});
$("#about").on("pageinit", function(){});
$("#contact").on("pageinit", function(){});
$("#other").on("pageinit", function(){});