/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","jquery","TYPO3/CMS/Core/Ajax/AjaxRequest","./Module/PasswordStrength","./Renderable/InfoBox","./Renderable/ProgressBar","./Renderable/Severity"],(function(e,t,a,s,n,l,r,c){"use strict";a=__importDefault(a);return new class{constructor(){this.selectorBody=".t3js-body",this.selectorModuleContent=".t3js-module-content",this.selectorMainContent=".t3js-installer-content",this.selectorProgressBar=".t3js-installer-progress",this.selectorDatabaseConnectOutput=".t3js-installer-databaseConnect-output",this.selectorDatabaseSelectOutput=".t3js-installer-databaseSelect-output",this.selectorDatabaseDataOutput=".t3js-installer-databaseData-output",this.initializeEvents(),a.default(()=>{this.initialize()})}initializeEvents(){a.default(document).on("click",".t3js-installer-environmentFolders-retry",e=>{e.preventDefault(),this.showEnvironmentAndFolders()}),a.default(document).on("click",".t3js-installer-environmentFolders-execute",e=>{e.preventDefault(),this.executeEnvironmentAndFolders()}),a.default(document).on("click",".t3js-installer-databaseConnect-execute",e=>{e.preventDefault(),this.executeDatabaseConnect()}),a.default(document).on("click",".t3js-installer-databaseSelect-execute",e=>{e.preventDefault(),this.executeDatabaseSelect()}),a.default(document).on("click",".t3js-installer-databaseData-execute",e=>{e.preventDefault(),this.executeDatabaseData()}),a.default(document).on("click",".t3js-installer-defaultConfiguration-execute",e=>{e.preventDefault(),this.executeDefaultConfiguration()}),a.default(document).on("click",".t3-install-form-password-toggle",e=>{e.preventDefault();const t=a.default(e.currentTarget),s=a.default(t.data("toggleTarget")),n=t.find(t.data("toggleIcon"));"password"===s.attr("type")?(n.removeClass("fa-lock").addClass("fa-eye"),s.attr("type","text")):(s.attr("type","password"),n.removeClass("fa-eye").addClass("fa-lock"))}),a.default(document).on("keyup",".t3-install-form-password-strength",()=>{n.initialize(".t3-install-form-password-strength")}),a.default(document).on("change","#t3js-connect-database-driver",e=>{let t=a.default(e.currentTarget).val();a.default(".t3-install-driver-data").hide(),a.default(".t3-install-driver-data input").attr("disabled","disabled"),a.default("#"+t+" input").attr("disabled",null),a.default("#"+t).show()})}initialize(){this.setProgress(0),this.getMainLayout()}getUrl(e){let t=location.href;return t=t.replace(location.search,""),void 0!==e&&(t=t+"?install[action]="+e),t}setProgress(e){let t=a.default(this.selectorProgressBar),s=0;0!==e&&(s=e/5*100,t.find(".progress-bar").empty().text(e+" / 5 - "+s+"% Complete")),t.find(".progress-bar").css("width",s+"%").attr("aria-valuenow",s)}getMainLayout(){new s(this.getUrl("mainLayout")).get({cache:"no-cache"}).then(async e=>{const t=await e.resolve();a.default(this.selectorBody).empty().append(t.html),this.checkInstallerAvailable()})}checkInstallerAvailable(){new s(this.getUrl("checkInstallerAvailable")).get({cache:"no-cache"}).then(async e=>{(await e.resolve()).success?this.checkEnvironmentAndFolders():this.showInstallerNotAvailable()})}showInstallerNotAvailable(){let e=a.default(this.selectorMainContent);new s(this.getUrl("showInstallerNotAvailable")).get({cache:"no-cache"}).then(async t=>{const a=await t.resolve();!0===a.success&&e.empty().append(a.html)})}checkEnvironmentAndFolders(){this.setProgress(1),new s(this.getUrl("checkEnvironmentAndFolders")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success?this.checkTrustedHostsPattern():this.showEnvironmentAndFolders()})}showEnvironmentAndFolders(){let e=a.default(this.selectorMainContent);new s(this.getUrl("showEnvironmentAndFolders")).get({cache:"no-cache"}).then(async t=>{const s=await t.resolve();if(!0===s.success){e.empty().html(s.html);let t=a.default(".t3js-installer-environment-details"),n=!1;Array.isArray(s.environmentStatusErrors)&&s.environmentStatusErrors.forEach(e=>{n=!0;let a=l.render(e.severity,e.title,e.message);t.append(a)}),Array.isArray(s.environmentStatusWarnings)&&s.environmentStatusWarnings.forEach(e=>{n=!0;let a=l.render(e.severity,e.title,e.message);t.append(a)}),Array.isArray(s.structureErrors)&&s.structureErrors.forEach(e=>{n=!0;let a=l.render(e.severity,e.title,e.message);t.append(a)}),n?(t.show(),a.default(".t3js-installer-environmentFolders-bad").show()):a.default(".t3js-installer-environmentFolders-good").show()}})}executeEnvironmentAndFolders(){new s(this.getUrl("executeEnvironmentAndFolders")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success&&this.checkTrustedHostsPattern()})}checkTrustedHostsPattern(){new s(this.getUrl("checkTrustedHostsPattern")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success?this.executeSilentConfigurationUpdate():this.executeAdjustTrustedHostsPattern()})}executeAdjustTrustedHostsPattern(){new s(this.getUrl("executeAdjustTrustedHostsPattern")).get({cache:"no-cache"}).then(()=>{this.executeSilentConfigurationUpdate()})}executeSilentConfigurationUpdate(){new s(this.getUrl("executeSilentConfigurationUpdate")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success?this.executeSilentTemplateFileUpdate():this.executeSilentConfigurationUpdate()})}executeSilentTemplateFileUpdate(){new s(this.getUrl("executeSilentTemplateFileUpdate")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success?this.checkDatabaseConnect():this.executeSilentTemplateFileUpdate()})}checkDatabaseConnect(){this.setProgress(2),new s(this.getUrl("checkDatabaseConnect")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success?this.checkDatabaseSelect():this.showDatabaseConnect()})}showDatabaseConnect(){let e=a.default(this.selectorMainContent);new s(this.getUrl("showDatabaseConnect")).get({cache:"no-cache"}).then(async t=>{const s=await t.resolve();!0===s.success&&(e.empty().html(s.html),a.default("#t3js-connect-database-driver").trigger("change"))})}executeDatabaseConnect(){let e=a.default(this.selectorDatabaseConnectOutput),t={"install[action]":"executeDatabaseConnect","install[token]":a.default(this.selectorModuleContent).data("installer-database-connect-execute-token")};a.default(a.default(this.selectorBody+" form").serializeArray()).each((e,a)=>{t[a.name]=a.value}),new s(this.getUrl()).post(t).then(async t=>{const a=await t.resolve();!0===a.success?this.checkDatabaseSelect():Array.isArray(a.status)&&(e.empty(),a.status.forEach(t=>{let a=l.render(t.severity,t.title,t.message);e.append(a)}))})}checkDatabaseSelect(){this.setProgress(3),new s(this.getUrl("checkDatabaseSelect")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success?this.checkDatabaseData():this.showDatabaseSelect()})}showDatabaseSelect(){let e=a.default(this.selectorMainContent);new s(this.getUrl("showDatabaseSelect")).get({cache:"no-cache"}).then(async t=>{const a=await t.resolve();!0===a.success&&e.empty().html(a.html)})}executeDatabaseSelect(){let e=a.default(this.selectorDatabaseSelectOutput),t={"install[action]":"executeDatabaseSelect","install[token]":a.default(this.selectorModuleContent).data("installer-database-select-execute-token")};a.default(a.default(this.selectorBody+" form").serializeArray()).each((e,a)=>{t[a.name]=a.value}),new s(this.getUrl()).post(t).then(async t=>{const a=await t.resolve();!0===a.success?this.checkDatabaseRequirements():Array.isArray(a.status)&&a.status.forEach(t=>{let a=l.render(t.severity,t.title,t.message);e.empty().append(a)})})}checkDatabaseRequirements(){let e=a.default(this.selectorDatabaseSelectOutput),t={"install[action]":"checkDatabaseRequirements","install[token]":a.default(this.selectorModuleContent).data("installer-database-check-requirements-execute-token")};a.default(a.default(this.selectorBody+" form").serializeArray()).each((e,a)=>{t[a.name]=a.value}),new s(this.getUrl()).post(t).then(async t=>{const a=await t.resolve();!0===a.success?this.checkDatabaseData():Array.isArray(a.status)&&(e.empty(),a.status.forEach(t=>{let a=l.render(t.severity,t.title,t.message);e.append(a)}))})}checkDatabaseData(){this.setProgress(4),new s(this.getUrl("checkDatabaseData")).get({cache:"no-cache"}).then(async e=>{!0===(await e.resolve()).success?this.showDefaultConfiguration():this.showDatabaseData()})}showDatabaseData(){let e=a.default(this.selectorMainContent);new s(this.getUrl("showDatabaseData")).get({cache:"no-cache"}).then(async t=>{const a=await t.resolve();!0===a.success&&e.empty().html(a.html)})}executeDatabaseData(){let e=a.default(this.selectorDatabaseDataOutput),t={"install[action]":"executeDatabaseData","install[token]":a.default(this.selectorModuleContent).data("installer-database-data-execute-token")};a.default(a.default(this.selectorBody+" form").serializeArray()).each((e,a)=>{t[a.name]=a.value});let n=r.render(c.loading,"Loading...","");e.empty().html(n),new s(this.getUrl()).post(t).then(async t=>{const a=await t.resolve();!0===a.success?this.showDefaultConfiguration():Array.isArray(a.status)&&a.status.forEach(t=>{let a=l.render(t.severity,t.title,t.message);e.empty().append(a)})})}showDefaultConfiguration(){let e=a.default(this.selectorMainContent);this.setProgress(5),new s(this.getUrl("showDefaultConfiguration")).get({cache:"no-cache"}).then(async t=>{const a=await t.resolve();!0===a.success&&e.empty().html(a.html)})}executeDefaultConfiguration(){let e={"install[action]":"executeDefaultConfiguration","install[token]":a.default(this.selectorModuleContent).data("installer-default-configuration-execute-token")};a.default(a.default(this.selectorBody+" form").serializeArray()).each((t,a)=>{e[a.name]=a.value}),new s(this.getUrl()).post(e).then(async e=>{const t=await e.resolve();top.location.href=t.redirect})}}}));