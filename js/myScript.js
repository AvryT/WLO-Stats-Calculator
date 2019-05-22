window.onload = charType();
window.onload = calculate();
function charType() { 
  var cType = document.getElementById("charDDL").value;
  document.getElementById("isRB").checked = false;
  
  if (cType == "Pet") {
    [].forEach.call(document.querySelectorAll('.petToggle'), function (ct) {
      ct.style.visibility = 'hidden'; 
  	  var ddl = document.getElementById("rebirthDDL"); 
      ddl.style.display = "none"; 
    });
  } else {
    [].forEach.call(document.querySelectorAll('.petToggle'), function (ct) {
      ct.style.visibility = 'visible';
    });
  }
  calculate();
}
function showHideRB() {
   var cType = document.getElementById("charDDL").value;
  
	if (document.getElementById("isRB").checked == true) {
  	var ddl = document.getElementById("rebirthDDL");
    if (cType == "Character") {
      ddl.style.display = "inline";  
    }
  }
  else { 
  	var ddl = document.getElementById("rebirthDDL");
    ddl.style.display = "none";
  } 
  calculate();
}
 
function calculate() {
  var element = document.getElementById("elementDDL").value;
  var getStats = {hp: 0, sp:0, stats:0, pp:0, atk:0, def: 0, mat:0, mdf:0, spd:0, atks:0, defs: 0, mats:0, mdfs:0, spds:0, Rhp: 0, Rsp:0, Ratk:0, Rdef: 0, Rmat:0, Rmdf:0, Rspd:0, saddle:"None", saddleBonus:0, saddleBonus2:0, saddle1:0, saddle2:0, saddle3:0, saddle11:0, saddle22:0, Ratks:0, Rdefs: 0, Rmats:0, Rmdfs:0, Rspds:0};
   
  if (element == "Earth") {  
    getStats = baseStats(1.4, 2.6, 1.4, 2.2, 1.6, getStats); 
  } else if (element == "Fire") {
    getStats = baseStats(2.0, 2.0, 1.6, 2.0, 1.6, getStats); 
  } else if (element == "Water") { 
    getStats = baseStats(1.4, 2.0, 1.4, 2.0, 1.6, getStats); 
  } else if (element == "Wind") { 
    getStats = baseStats(1.4, 2.0, 1.4, 2.0, 2.1, getStats); 
  }
    
  getStats = ppStats(getStats); //Potential Pills
  getStats = addStats(getStats); //Add stats
  getStats = pillStats(getStats); //random pill 
  getStats = rbStats(getStats); //rb stats
  getStats = hotspringStats(getStats); //hotstrings hp/sp
  
  getStats = equipStats(getStats); //equips
  
  //Riding Stats
  getStats = ridingStats(getStats); //riding Status
  
  printStats(getStats);
}
function baseStats(strF, conF, intF, wisF, agiF, getStats) {
  var level = parseInt(document.getElementById("level").value);
  
  var totalLevel = level;
  if (document.getElementById("isRB").checked == true) {
    totalLevel += 100;
  }
  else {
    totalLevel = level;
  }
  
  getStats["atk"] += Math.round(totalLevel * strF);
  getStats["def"] += Math.round(totalLevel * conF);
  getStats["mat"] += Math.round(totalLevel * intF);
  getStats["mdf"] += Math.round(totalLevel * wisF);
  getStats["spd"] += Math.round(totalLevel * agiF); 
   
  return getStats;
}
function addStats(getStats) { //Add Stats
  //remaining stats
  var level = parseInt(document.getElementById("level").value);
  
  var totalLevel = level;
  if (document.getElementById("isRB").checked == true) {
    totalLevel += 100;
  }
  else {
    totalLevel = level;
  }
  
  var str = parseInt(document.getElementById("str").value) ;
  var con = parseInt(document.getElementById("con").value);
  var int = parseInt(document.getElementById("int").value);
  var wis = parseInt(document.getElementById("wis").value);
  var agi = parseInt(document.getElementById("agi").value);
  
  getStats["stats"] = totalLevel * 3 + 5; 
  getStats["stats"] -= (str + con + int + wis + agi);
  
  getStats["hp"] += Math.round(Math.pow(totalLevel, 0.35) * (con + getStats["pp"]) * 2 + totalLevel * 1 + (con + getStats["pp"]) * 2 + 180);
  getStats["sp"] += Math.round(Math.pow(totalLevel, 0.3) * (wis + getStats["pp"]) * 3.2 + totalLevel * 1 + (wis + getStats["pp"]) * 2 + 94);
  
  getStats["atk"] += Math.round(str * 2);
  getStats["def"] += Math.round(con * 1.75);
  getStats["mat"] += Math.round(int * 2);
  getStats["mdf"] += Math.round(wis * 2.2);
  getStats["spd"] += Math.round(agi * 1.8); 
    
  return getStats;
}
function ppStats(getStats) { //Potential Pills
  var pp = [0, 1, 2, 3, 4, 6, 9, 13, 18, 24, 31, 39, 48];
  var ppLevel = parseInt(document.getElementById("potentialDDL").value);
  
  getStats["pp"] = pp[ppLevel];
  getStats["atk"] += Math.round(pp[ppLevel] * 2);
  getStats["def"] += Math.round(pp[ppLevel] * 1.75);
  getStats["mat"] += Math.round(pp[ppLevel] * 2);
  getStats["mdf"] += Math.round(pp[ppLevel] * 2.2);
  getStats["spd"] += Math.round(pp[ppLevel] * 1.8); 
   
  return getStats;
}
function pillStats(getStats) { //Random Pills
  var atkP = parseInt(document.getElementById("atkP").value);
  var defP = parseInt(document.getElementById("defP").value);
  var matP = parseInt(document.getElementById("matP").value);
  var mdfP = parseInt(document.getElementById("mdfP").value);
  var spdP = parseInt(document.getElementById("spdP").value);
  
  getStats["atks"] += atkP;
  getStats["defs"] += defP;
  getStats["mats"] += matP;
  getStats["mdfs"] += mdfP;
  getStats["spds"] += spdP;
   
  return getStats;
}
function rbStats(getStats) { //rb stats
  var job = document.getElementById("rebirthDDL").value;
  
  if (document.getElementById("isRB").checked == true) { 
    var cType = document.getElementById("charDDL").value;
    
    if (cType == "Character") {
      if (job == "Killer") {  
        getStats["atk"] = Math.round(getStats["atk"] * 1.1); 
      } else if (job == "Warrior") {
        getStats["def"] = Math.round(getStats["def"] * 1.1); 
      } else if (job == "Knight") { 
        getStats["spd"] = Math.round(getStats["spd"] * 1.1); 
      } else if (job == "Wit") { 
        getStats["mat"] = Math.round(getStats["mat"] * 1.1); 
      } else if (job == "Priest") { 
        getStats["mdf"] = Math.round(getStats["mdf"] * 1.1); 
      } else if (job == "Seer") { 
        getStats["spd"] = Math.round(getStats["spd"] * 1.1); 
      }
    } 
  }
  
  return getStats;
}
function hotspringStats(getStats) { //hp/sp 
  var hotspring = parseInt(document.getElementById("hotsprings").value);
  
  getStats["hp"] += hotspring * 10;
  getStats["sp"] += hotspring * 10;
   
  return getStats;
}
function equipStats(getStats) {
  var equipName = ["Head", "Arm", "Body", "Hand", "Special", "Shoes"];
   
  for(eq = 0; eq < 6; eq++) {
    getStats["atk"] += parseInt(document.getElementById("atk" + equipName[eq]).value); 
    getStats["def"] += parseInt(document.getElementById("def" + equipName[eq]).value);
    getStats["mat"] += parseInt(document.getElementById("mat" + equipName[eq]).value);
    getStats["mdf"] += parseInt(document.getElementById("mdf" + equipName[eq]).value);
    getStats["spd"] += parseInt(document.getElementById("spd" + equipName[eq]).value);
    getStats["hp"] += parseInt(document.getElementById("hp" + equipName[eq]).value);
    getStats["sp"] += parseInt(document.getElementById("sp" + equipName[eq]).value);
  }   
  
  return getStats;
}
  
function ridingStats(getStats) {
  var saddleType = document.getElementById("saddleDDL").value;
  getStats["saddle"] = saddleType;
 
  //Stats
  getStats["Ratk"]  = parseInt(document.getElementById("RatkA").value);
  getStats["Rdef"]  = parseInt(document.getElementById("RdefA").value);
  getStats["Rmat"]  = parseInt(document.getElementById("RmatA").value);
  getStats["Rmdf"]  = parseInt(document.getElementById("RmdfA").value);
  getStats["Rspd"]  = parseInt(document.getElementById("RspdA").value);
  getStats["Rhp"] = parseInt(document.getElementById("RhpA").value);
  getStats["Rsp"] = parseInt(document.getElementById("RspA").value);
  //Pills
  getStats["Ratks"] = parseInt(document.getElementById("RatkP").value);  
  getStats["Rdefs"] = parseInt(document.getElementById("RdefP").value);
  getStats["Rmats"] = parseInt(document.getElementById("RmatP").value);
  getStats["Rmdfs"] = parseInt(document.getElementById("RmdfP").value);
  getStats["Rspds"] = parseInt(document.getElementById("RspdP").value);
  
 if (saddleType != "None")
 { 
    var saddlePill = parseInt(document.getElementById("saddlePill").value);
    //Saddle Type Bonus
    var saddleMultiply = {Bash:0.3333, Defense:0.2, Magic:0.3333, Spirit:0.2, Swift:0.3333, Tenacity:0.3333, Brooch:0.1, HeartBrooch:1.2}; 
 
   if (saddleType == "Bash") {
      getStats["saddleBonus"] = Math.round(getStats["Ratk"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["atk"];
      getStats["saddle2"] = getStats["atks"];
   } else if (saddleType == "Defense") {
      getStats["saddleBonus"] = Math.round(getStats["Rdef"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["def"];
      getStats["saddle2"] = getStats["defs"];
   } else if (saddleType == "Magic") {
      getStats["saddleBonus"] = Math.round(getStats["Rmat"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["mat"];
      getStats["saddle2"] = getStats["mats"];
   } else if (saddleType == "Spirit") {
      getStats["saddleBonus"] = Math.round(getStats["Rmdf"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["mdf"];
      getStats["saddle2"] = getStats["mdfs"];
   } else if (saddleType == "Swift") {
      getStats["saddleBonus"] = Math.round(getStats["Rspd"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["spd"];
      getStats["saddle2"] = getStats["spds"];
   } else if (saddleType == "Tenacity") {
      getStats["saddleBonus"] = Math.round(getStats["Rhp"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["hp"]; 
   } else if (saddleType == "Brooch") {
      getStats["saddleBonus"] = Math.round(getStats["Ratk"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddleBonus2"] = Math.round(getStats["Rmat"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["atk"]; 
      getStats["saddle2"] = getStats["atks"]; 
      getStats["saddle11"] = getStats["mat"]; 
      getStats["saddle22"] = getStats["mats"]; 
   } else if (saddleType == "HeartBrooch") {
      getStats["saddleBonus"] = Math.round(getStats["Ratk"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddleBonus2"] = Math.round(getStats["Rmat"] * (saddleMultiply[saddleType] + 0.005 * saddlePill));
      getStats["saddle1"] = getStats["Ratk"]; 
      getStats["saddle2"] = getStats["Ratks"];
      getStats["saddle3"] = getStats["Rhp"]; 
      getStats["saddle11"] = getStats["Rmat"]; 
      getStats["saddle22"] = getStats["Rmats"]; 
   }  
    
   //Saddle Pills
   //RB (Knight)
   if (document.getElementById("isRB").checked) {
	    var job = document.getElementById("rebirthDDL").value;
      
      if (job == "Knight") {
        getStats["saddleBonus"]  += Math.round((getStats["Rspd"]) * 0.15);
      }
   } 
 } 
    
  return getStats;
}
function printStats(getStats) {
  document.getElementById("hp").innerHTML = getStats["hp"];
  document.getElementById("sp").innerHTML = getStats["sp"];
  document.getElementById("stats").innerHTML = getStats["stats"];
  
  document.getElementById("atk").innerHTML = getStats["atk"];
  document.getElementById("def").innerHTML = getStats["def"];
  document.getElementById("mat").innerHTML = getStats["mat"];
  document.getElementById("mdf").innerHTML = getStats["mdf"];
  document.getElementById("spd").innerHTML = getStats["spd"];
  
  document.getElementById("atks").innerHTML = getStats["atks"];
  document.getElementById("defs").innerHTML = getStats["defs"];
  document.getElementById("mats").innerHTML = getStats["mats"];
  document.getElementById("mdfs").innerHTML = getStats["mdfs"];
  document.getElementById("spds").innerHTML = getStats["spds"];
   
  var pps = document.getElementsByClassName("pp");
  Array.from(pps).forEach((pp) => {
    pp.innerHTML = getStats["pp"];
});
  
  var str = parseInt(document.getElementById("str").value);
  var con = parseInt(document.getElementById("con").value);
  var int = parseInt(document.getElementById("int").value);
  var wis = parseInt(document.getElementById("wis").value);
  var agi = parseInt(document.getElementById("agi").value);
  
  document.getElementById("totalStr").innerHTML = str + getStats["pp"];
  document.getElementById("totalCon").innerHTML = con + getStats["pp"];
  document.getElementById("totalInt").innerHTML = int + getStats["pp"];
  document.getElementById("totalWis").innerHTML = wis + getStats["pp"];
  document.getElementById("totalAgi").innerHTML = agi + getStats["pp"];
  
  //New stats after adding riding
  if (getStats["saddle"] == "None" || getStats["saddle"] == "HeartBrooch") {
    document.getElementById("char").innerHTML = "(New Pet Stats)"; 
      
    document.getElementById("Rhp").innerHTML = getStats["Rhp"];
    document.getElementById("Rsp").innerHTML = getStats["Rsp"]; 
    document.getElementById("Ratk").innerHTML = getStats["Ratk"];
    document.getElementById("Rdef").innerHTML = getStats["Rdef"];
    document.getElementById("Rmat").innerHTML = getStats["Rmat"];
    document.getElementById("Rmdf").innerHTML = getStats["Rmdf"];
    document.getElementById("Rspd").innerHTML = getStats["Rspd"]; 
    document.getElementById("Ratks").innerHTML = getStats["Ratks"];
    document.getElementById("Rdefs").innerHTML = getStats["Rdefs"];
    document.getElementById("Rmats").innerHTML = getStats["Rmats"];
    document.getElementById("Rmdfs").innerHTML = getStats["Rmdfs"];
    document.getElementById("Rspds").innerHTML = getStats["Rspds"]; 
        
    document.getElementById("hpn").innerHTML = getStats["Rhp"];
    document.getElementById("spn").innerHTML = getStats["Rsp"]; 
    document.getElementById("atkn").innerHTML = getStats["Ratk"];
    document.getElementById("defn").innerHTML = getStats["Rdef"];
    document.getElementById("matn").innerHTML = getStats["Rmat"];
    document.getElementById("mdfn").innerHTML = getStats["Rmdf"];
    document.getElementById("spdn").innerHTML = getStats["Rspd"]; 
    document.getElementById("atksn").innerHTML = getStats["Ratks"];
    document.getElementById("defsn").innerHTML = getStats["Rdefs"];
    document.getElementById("matsn").innerHTML = getStats["Rmats"];
    document.getElementById("mdfsn").innerHTML = getStats["Rmdfs"];
    document.getElementById("spdsn").innerHTML = getStats["Rspds"]; 
    } else {
        document.getElementById("char").innerHTML = "(New Character Stats)"; 
        
        document.getElementById("hpn").innerHTML = getStats["hp"];
        document.getElementById("spn").innerHTML = getStats["sp"];
        document.getElementById("atkn").innerHTML = getStats["atk"];
        document.getElementById("defn").innerHTML = getStats["def"];
        document.getElementById("matn").innerHTML = getStats["mat"];
        document.getElementById("mdfn").innerHTML = getStats["mdf"];
        document.getElementById("spdn").innerHTML = getStats["spd"];
        document.getElementById("atksn").innerHTML = getStats["atks"];
        document.getElementById("defsn").innerHTML = getStats["defs"];
        document.getElementById("matsn").innerHTML = getStats["mats"];
        document.getElementById("mdfsn").innerHTML = getStats["mdfs"];
        document.getElementById("spdsn").innerHTML = getStats["spds"]; 
      } 
  
  var saddleDesc = {None: "No Riding Saddle/Brooch", Bash: "+33% ATK from riding pet<br>(+0.5%, up to 200 pills)", Defense: "+20% DEF from riding pet<br>(+0.5%, up to 200 pills)", Magic: "+33% MAT from riding pet<br>(+0.5%, up to 200 pills)", Spirit: "+20% MDF from riding pet<br>(+0.5%, up to 200 pills)", Swift: "+33% SPD from riding pet<br>(+0.5%, up to 200 pills)", Tenacity: "+33% HP from riding pet<br>(+0.5%, up to 200 pills)", Brooch: "+10% ATK/MAT from pet<br>(+0.5%, up to 200 pills)", HeartBrooch: "+300 HP, +120% ATK & MATK for pet<br>(+0.5%, up to 100 pills)"};
  var saddleType = {None: "", Bash: "ATK", Defense: "DEF", Magic: "MAT", Spirit: "MDF", Swift: "SPD", Tenacity: "HP"};
  document.getElementById("saddleDesc").innerHTML = saddleDesc[getStats["saddle"]];
   
  if (getStats["saddle"] == "Brooch" || getStats["saddle"] == "HeartBrooch") {
    document.getElementById("bonusSaddle").innerHTML =  getStats["saddleBonus"] + " ATK, + " + getStats["saddleBonus2"] + " MAT";
    document.getElementById("totalBonus").innerHTML = "<span style='color: blue;'>" + (getStats["saddle1"] + getStats["saddleBonus"]) + "</span> + " + getStats["saddle2"] + " ATK, " + "<span style='color: blue;'>" + (getStats["saddle11"] + getStats["saddleBonus2"]) + "</span> + " + getStats["saddle22"] + " MAT"; 
     
    document.getElementById("atkn").innerHTML = "<span style='color: blue;'>" + (getStats["saddle1"] + getStats["saddleBonus"]) + "</span>";
    document.getElementById("matn").innerHTML = "<span style='color: blue;'>" + (getStats["saddle11"] + getStats["saddleBonus2"]) + "</span>";
    
    if (getStats["saddle"] == "HeartBrooch") { 
      document.getElementById("bonusSaddle").innerHTML += ", + 300 HP";
      
      document.getElementById("hpn").innerHTML = "<span style='color: blue;'>" + (getStats["saddle3"] + 300) + "</span>";
    }
    
  } else { 
    document.getElementById("bonusSaddle").innerHTML = getStats["saddleBonus"] + " " + saddleType[getStats["saddle"]];
    document.getElementById("totalBonus").innerHTML = "<span style='color: blue;'>" + (getStats["saddle1"] + getStats["saddleBonus"]) + "</span> + " + getStats["saddle2"] + " " + saddleType[getStats["saddle"]];
    
    document.getElementById(saddleType[getStats["saddle"]].toLowerCase() + "n").innerHTML = "<span style='color: blue;'>" + (getStats["saddle1"] + getStats["saddleBonus"]) + "</span>";
  }
   
  document.getElementById("Ratk").innerHTML = getStats["Ratk"];
  document.getElementById("Rdef").innerHTML = getStats["Rdef"];
  document.getElementById("Rmat").innerHTML = getStats["Rmat"];
  document.getElementById("Rmdf").innerHTML = getStats["Rmdf"];
  document.getElementById("Rspd").innerHTML = getStats["Rspd"];
  document.getElementById("Rhp").innerHTML = getStats["Rhp"];
  document.getElementById("Rsp").innerHTML = getStats["Rsp"];
  
  document.getElementById("Ratks").innerHTML = getStats["Ratks"];
  document.getElementById("Rdefs").innerHTML = getStats["Rdefs"];
  document.getElementById("Rmats").innerHTML = getStats["Rmats"];
  document.getElementById("Rmdfs").innerHTML = getStats["Rmdfs"];
  document.getElementById("Rspds").innerHTML = getStats["Rspds"];
 
  return getStats;
}
function resetStats() {
  document.getElementById("atkP").value = 0;
  document.getElementById("defP").value = 0;
  document.getElementById("matP").value = 0;
  document.getElementById("mdfP").value = 0;
  document.getElementById("spdP").value = 0;
  
  document.getElementById("str").value = 0;
  document.getElementById("con").value = 0;
  document.getElementById("int").value = 0;
  document.getElementById("wis").value = 0;
  document.getElementById("agi").value = 0;
  
  calculate();
}
function resetEquip(equip) {
  document.getElementById("atk" + equip).value = 0;
  document.getElementById("def" + equip).value = 0;
  document.getElementById("mat" + equip).value = 0;
  document.getElementById("mdf" + equip).value = 0;
  document.getElementById("spd" + equip).value = 0;
  document.getElementById("hp" + equip).value = 0;
  document.getElementById("sp" + equip).value = 0;
   
  calculate();
}
  
function resetRiding() {
  document.getElementById("saddleDDL").selectedIndex = 0;
  document.getElementById("saddleDesc").value = 0;
  document.getElementById("saddlePill").value = 0;
   
  document.getElementById("RatkP").value = 0;
  document.getElementById("RdefP").value = 0;
  document.getElementById("RmatP").value = 0;
  document.getElementById("RmdfP").value = 0;
  document.getElementById("RspdP").value = 0; 
  
  document.getElementById("RatkA").value = 0;
  document.getElementById("RdefA").value = 0;
  document.getElementById("RmatA").value = 0;
  document.getElementById("RmdfA").value = 0;
  document.getElementById("RspdA").value = 0;  
  document.getElementById("RhpA").value = 0;
  document.getElementById("RspA").value = 0;  
  
  calculate();
}
function addUp() {
  var basedStats = parseInt(document.getElementById("addBased").value);
  var forge = parseInt(document.getElementById("addForge").value);
  var insert = parseInt(document.getElementById("addInsert").value);
  var scroll = parseInt(document.getElementById("addScroll").value);
  
  document.getElementById("totalAddUp").innerHTML = basedStats + forge + insert + scroll;
}
function addUpReset() { 
  document.getElementById("addBased").value = 0;
  document.getElementById("addForge").value = 0;
  document.getElementById("addInsert").value = 0;
  document.getElementById("addScroll").value = 0;
  addUp();
}
