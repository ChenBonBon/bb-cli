import { stringify } from 'qs';

const _ = require('underscore');
const {
	XDPApi,
	TicketsApi,
	CMSApi,
	cloudReport,
	XDPProApi,
	NotificationApi,
	FednodeApi,
	AppApi,
	FuwuApi,
	DatasetApi,
} = global;

export function fu(uri, params = {}) {
	let fpArray = [];
	_.map(params, (newvalue, key) => {
		let value;
		if (newvalue instanceof Array) {
			value = newvalue.map((item) => encodeURIComponent(decodeURIComponent(item)));
		} else {
			value = encodeURIComponent(decodeURIComponent(newvalue));
		}
		if (_.isArray(value)) {
			value.map((v) => {
				if (v !== '') {
					fpArray.push(`${key}=${v}`);
				}
			});
		} else if (value !== '') {
			fpArray.push(`${key}=${value}`);
		}
	});
	const fps = fpArray.join('&');
	let url = uri;
	if (fps !== '') {
		url = `${url}?${fps}`;
	}
	return url;
}

// User API
export function signInUrl() {
	return fu(`${XDPApi}/sign-in`);
}
export function signOutUrl() {
	return fu(`${XDPApi}/sign-out`);
}

export function resetPasswordUrl() {
	return fu(`${XDPApi}/operator/pwd`);
}
export function updateUserStatusUrl(userId) {
	return fu(`${XDPApi}/users/${userId}/disable`);
}
export function getTermsAndConditionsUrl(id) {
	return fu(`${CMSApi}/app_setting/${id}`);
}
export function getApplicationListUrl(orgId, params) {
	return fu(`${NotificationApi}/orgs/${orgId}/notifications`, params);
}
export function getApplicationListDetailsUrl(notificationId) {
	return fu(`${NotificationApi}/notifications/${notificationId}`);
}
export function sendVerificationUrl(eventId) {
	return fu(`${NotificationApi}/events/${eventId}/audit`);
}
export function getNodeListUrl() {
	return fu(`${FednodeApi}/listpeers`);
}
export function getNodeInfoUrl() {
	return fu(`${FednodeApi}/get_fednode_info`);
}
export function removeNodeUrl(nodeName) {
	return fu(`${FednodeApi}/peer_break?name=${nodeName}`);
}
export function updateFedNodeUrl() {
	return fu(`${FednodeApi}/peer_apply`);
}
export function updateNodeInfoCallUrl() {
	return fu(`${FednodeApi}/change_fednode_fullname`);
}
export function getNodeTableInfoUrl(payload) {
	return fu(`${FednodeApi}/listnodes`, payload);
}
export function unlockUserUrl(userId) {
	return fu(`${XDPApi}/users/${userId}/unlock`);
}
export function changePasswordUrl(userId) {
	return fu(`${XDPApi}/users/${userId}/change_password`);
}
export function updateOrgStatusUrl(orgId) {
	return fu(`${XDPApi}/orgs/${orgId}/disable`);
}
export function fetchOrgListUrl(modalType) {
	if (modalType === 'edit') {
		return fu(`${XDPApi}/x/orgs/for_option_all`);
	} else {
		return fu(`${XDPApi}/x/orgs/for_option`);
	}
}
export function fetchProjectListUrl(payload) {
	return fu(`${XDPProApi}/x/projects/for_options`, payload);
}

export function fetchAppListUrl() {
	let payload = {
		page: 1,
		pageSize: 100000,
	};
	return fu(`${AppApi}/apps`, payload);
}

export function fetchUserListUrl(payload) {
	// return fu(`${XDPApi}/x/users/for_options`, payload);
	return fu(`${XDPApi}/x/users/for_options`, payload);
}

export function fetchOrgDetailsUrl(orgId) {
	return fu(`${XDPApi}/orgs/${orgId}`);
}
export function fetchMemberListUrl(orgId, payload) {
	return fu(`${XDPApi}/orgs/${orgId}/members`, payload);
}

export function userUrl(userId) {
	return fu(`${XDPApi}/users/${userId}`);
}
export function checkVerificationSettingUrl(userName) {
	return fu(`${XDPApi}/operator/${userName}/get_user_verification`);
}
export function updateUserProfileUrl() {
	return fu(`${XDPApi}/operator/update`);
}

export function sendVerificationCodeUrl(userName) {
	return fu(`${XDPApi}/operator/${userName}/send_verification_code`);
}
export function getUserInfoUrl() {
	return fu(`${XDPApi}/operator`);
}
export function operatorUrl() {
	return fu(`${XDPApi}/operator`);
}

export function orgsUrl(params) {
	return fu(`${XDPApi}/orgs/`, params);
}
export function addUserRoleUrl(orgId) {
	return fu(`${XDPApi}/orgs/${orgId}/add_member`);
}
export function updateUserRoleUrl(orgId) {
	return fu(`${XDPApi}/orgs/${orgId}/update_member`);
}
export function updateOrgInfoUrl(orgId) {
	return fu(`${XDPApi}/orgs/${orgId}`);
}

export function getOneOrgUrl(id) {
	return fu(`${XDPApi}/orgs/${id}`);
}

export function usersUrl(params) {
	return fu(`${XDPApi}/users`, params);
}
export function getOperationsFuwusUrl(params) {
	return fu(`${FuwuApi}/operations/fuwus`, params);
}
export function auditFuwuUrl(fuwuId) {
	return fu(`${FuwuApi}/operations/fuwus/${fuwuId}/_audit`);
}
export function stopItServiceUrl(fuwuId) {
	return fu(`${FuwuApi}/operations/fuwus/${fuwuId}/_stop`);
}
export function fetchAuditListUrl(payload) {
	return fu(`${XDPApi}/user_audits/list`, payload);
}
export function viewFileUrl(attachmentId) {
	return fu(`${XDPApi}/attachments/${attachmentId}`);
}
export function userAuditUrl(id) {
	return fu(`${XDPApi}/user_audits/${id}`);
}
export function auditUserUrl(id) {
	return fu(`${XDPApi}/user_audits/${id}/status`);
}

export function auditServiceMethodUrl(fuwuId) {
	return fu(`${FuwuApi}/operations/fuwus/${fuwuId}/_audit`);
}
export function downloadFileUrl(id) {
	return fu(`${XDPApi}/attachments/${id}/json`);
}
export function getSpecifiedInstanceUrl(fuwuId, params) {
	return fu(`${FuwuApi}/fuwus/${fuwuId}/instances`, params);
}
export function fetchDeploymentListUrl(params) {
	return fu(`${FuwuApi}/operations/fuwus`, params);
}
export function fetchDetailsListUrl(fuwuId) {
	return fu(`${FuwuApi}/fuwus/${fuwuId}`);
}
export function uploadServiceIconUrl() {
	return fu(`${FuwuApi}/fuwus/attachments?format=ICON`);
}
export function fetchServiceIconUrl(fuwuId) {
	return fu(`${FuwuApi}/x/fuwus/${fuwuId}/icon`);
}

// Tickets
export function getTicketsUrl(params) {
	return fu(`${TicketsApi}/tickets/search?${stringify(params)}`);
}

export function getTicketDetailUrl(id) {
	return fu(`${TicketsApi}/tickets/${id}`);
}

export function getTicketAttachmentsUrl(id) {
	return fu(`${TicketsApi}/tickets/${id}/attachments`);
}

export function previewAttachmentUrl(id) {
	return fu(`${TicketsApi}/view/attachments/${id}`);
}

export function uploadAttachmentUrl() {
	return fu(`${TicketsApi}/attachments`);
}

export function getReportInfoUrl() {
	return fu(`${cloudReport}/fetch_cloud_usage_report`);
}

export function replyTicketUrl(id) {
	return fu(`${TicketsApi}/tickets/${id}/reply`);
}

export function deleteReplyUrl(id, replyId) {
	return fu(`${TicketsApi}/tickets/${id}/replies/${replyId}`);
}

export function ticketReplyListUrl(id, params) {
	return fu(`${TicketsApi}/tickets/${id}/list?${stringify(params)}`);
}

// cms
export function uploadCmsAttachmentsUrl() {
	return fu(`${CMSApi}/attachments`);
}
export function viewCmsAttachmentUrl(id) {
	return fu(`${CMSApi}/view/attachments/${id}`);
}
export function docsListUrl(subjectId, params) {
	return fu(`${CMSApi}/subjects/${subjectId}/docs/search?${stringify(params)}`);
}

export function setDocsStatusUrl(subjectId, docsId) {
	return `${CMSApi}/subjects/${subjectId}/docs/${docsId}/display`;
}

export function postListUrl(params) {
	return fu(`${CMSApi}/contents/search?${stringify(params)}`);
}
export function bannerListUrl(params) {
	return fu(`${CMSApi}/banners/search?${stringify(params)}`);
}

export function getContentListUrl(params) {
	return fu(`${CMSApi}/subjects/list`, params);
}

export function getPostSubjectsUrl() {
	return fu(`${CMSApi}/subjects/list/dropdown`);
}

export function sortPostUrl(subjectId) {
	return `${CMSApi}/subjects/${subjectId}/contents/sort`;
}

export function deleteContentUrl(subjectId, contentId) {
	return `${CMSApi}/subjects/${subjectId}/contents/${contentId}`;
}
export function deleteDocUrl(subjectId, docId) {
	return `${CMSApi}/subjects/${subjectId}/docs/${docId}`;
}

export function getFooterInfoUrl() {
	return `${CMSApi}/bottom/list`;
}

export function getSlugInfoUrl() {
	return `${CMSApi}/segment/preview_last_dataset`;
}

export function getDatasetInfoUrl(key) {
	return `${CMSApi}/segment/list/${key}`;
}

export function saveFooterInfoUrl() {
	return `${CMSApi}/bottom`;
}

export function saveDatasetInfoUrl() {
	return `${CMSApi}/segment`;
}

export function sortBannerUrl() {
	return `${CMSApi}/banners/sort`;
}

export function setPostStatusUrl(subjectId, contentId) {
	return fu(`${CMSApi}/subjects/${subjectId}/contents/${contentId}/display`);
}
export function setBannerStatusUrl(contentId) {
	return fu(`${CMSApi}/banners/${contentId}/display`);
}
export function getCmsContentUrl(subjectId, contentId) {
	return fu(`${CMSApi}/subjects/${subjectId}/contents/${contentId}`);
}

export function createCmsContentUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/contents`);
}

export function createBannerUrl() {
	return fu(`${CMSApi}/banners`);
}

export function updateCmsContentUrl(subjectId, contentId) {
	return fu(`${CMSApi}/subjects/${subjectId}/contents/${contentId}`);
}

export function hiddenCatelogUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/display`);
}
export function showCatelogUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/display`);
}
export function getSubjectInfoUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}`);
}
export function getBannerInfoUrl(id) {
	return fu(`${CMSApi}/banners/${id}`);
}
export function updateSubjectUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}`);
}
export function updateBannerUrl(id) {
	return fu(`${CMSApi}/banners/${id}`);
}
export function getAboutUsTreeUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/contents/tree`);
}
export function getDeveloperTreeUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/docs/tree`);
}
export function sortDevelopTreeUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/docs/sort`);
}
export function sortAboutUsTreeUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/contents/sort`);
}

export function getCmsDocumentUrl(subjectId, documentId) {
	return fu(`${CMSApi}/subjects/${subjectId}/docs/${documentId}`);
}

export function updateCmsDocumentUrl(subjectId, documentId) {
	return fu(`${CMSApi}/subjects/${subjectId}/docs/${documentId}`);
}

export function createCmsDocumentUrl(subjectId) {
	return fu(`${CMSApi}/subjects/${subjectId}/docs`);
}

export function fetchCloudAPIUrl(params) {
	let paramsVal = '';
	if (params) {
		paramsVal = `?${stringify(params)}`;
	}
	return fu(`${XDPApi}/report_api_keys/search${paramsVal}`);
}

export function deleteBannerUrl(id) {
	return fu(`${CMSApi}/banners/${id}`);
}

export function deleteAboutUsUrl(subjectId, id) {
	return fu(`${CMSApi}/subjects/${subjectId}/contents/${id}`);
}

export function createAPIKeyUrl() {
	return fu(`${XDPApi}/report_api_keys`);
}

export function editAPIKeyUrl(id) {
	return fu(`${XDPApi}/report_api_keys/${id}`);
}

export function createMaintanceUrl() {
	return fu(`${CMSApi}/maintenances`);
}

export function getMaintanceUrl(id) {
	return fu(`${CMSApi}/maintenances/${id}`);
}

export function endMaintanceUrl(id) {
	return fu(`${CMSApi}/maintenances/${id}/close`);
}

export function deleteMaintanceUrl(id) {
	return fu(`${CMSApi}/maintenances/${id}`);
}

export function getMaintanceListUrl(params) {
	return fu(`${CMSApi}/maintenances/search?${stringify(params)}`);
}

export function getInitialInfoUrl() {
	return fu(`${cloudReport}/admin_dashboard/biz/counts`);
}

export function getDatasetGraphDataUrl(stats_level) {
	return fu(`${cloudReport}/admin_dashboard/biz/dataset_stats?stats_level=${stats_level}`);
}
// todo 后续替换所有下列的接口

export function getXdpXfsDataUrl(type, stats_level, metric_name) {
	return fu(
		`${cloudReport}/admin_dashboard/hw/server_stats?metric_name=${metric_name}&server_type=${type}&time_range=${stats_level}`
	);
}
export function getInitialValueUrl() {
	return fu(`${cloudReport}/admin_dashboard/hw/counts`);
}
export function getServerDetailUrl() {
	return fu(`${cloudReport}/admin_dashboard/hw/server_list`);
}
export function getDaasSparkUrl(type, stats_level, metric_name) {
	return fu(
		`${cloudReport}/admin_dashboard/hw/server_stats?metric_name=${metric_name}&server_type=${type}&time_range=${stats_level}`
	);
}
export function getUtilsEbsUrl(type, stats_level, metric_name) {
	return fu(
		`${cloudReport}/admin_dashboard/hw/ebs_stats?metric_name=${metric_name}&ebs_type=${type}&time_range=${stats_level}`
	);
}
export function getUtilsUrl(type, stats_level, metric_name) {
	return fu(
		`${cloudReport}/admin_dashboard/hw/server_stats?metric_name=${metric_name}&server_type=${type}&time_range=${stats_level}`
	);
}
export function getStorageEbsUrl(type, stats_level, metric_name) {
	return fu(
		`${cloudReport}/admin_dashboard/hw/ebs_stats?metric_name=${metric_name}&ebs_type=${type}&time_range=${stats_level}`
	);
}
export function getStorageUrl(type, stats_level, metric_name) {
	return fu(
		`${cloudReport}/admin_dashboard/hw/server_stats?metric_name=${metric_name}&server_type=${type}&time_range=${stats_level}`
	);
}

export function getInstanceListUrl(searchInfo, payload) {
	if (searchInfo && searchInfo !== '') {
		return fu(`${cloudReport}/admin_dashboard/biz/instance_list?search=${searchInfo}`);
	} else {
		return fu(`${cloudReport}/admin_dashboard/biz/instance_list`);
	}
}
export function getInstanceDetailsUrl(payload) {
	return fu(`${cloudReport}/admin_dashboard/biz/instance_storage`, payload);
}
export function stopInstanceUrl(instanceId, app_type) {
	return fu(`${XDPApi}/instances/${app_type}/${instanceId}/stop`);
}
export function getPlatformGraphDataUrl(stats_level) {
	return fu(`${cloudReport}/admin_dashboard/biz/resource_stats?stats_level=${stats_level}`);
}
export function getProjectGraphDataUrl(stats_level) {
	return fu(`${cloudReport}/admin_dashboard/biz/project_stats?stats_level=${stats_level}`);
}
export function getInstanceGraphDataUrl(stats_level) {
	return fu(`${cloudReport}/admin_dashboard/biz/instance_distribution?stats_level=${stats_level}`);
}
export function getInstanceTrendGraphDataUrl(stats_level) {
	return fu(`${cloudReport}/admin_dashboard/biz/instance_stats?stats_level=${stats_level}`);
}

export function serviceListUrl(params) {
	return fu(`${XDPApi}/pricings/packages/search?${stringify(params)}`);
}

export function getServiceInfoUrl(id) {
	return fu(`${XDPApi}/pricings/packages/${id}`);
}

export function updateServiceUrl(id) {
	return fu(`${XDPApi}/pricings/packages/${id}`);
}

export function createServiceUrl() {
	return fu(`${XDPApi}/pricings/packages`);
}

export function getOrderServiceListUrl(params) {
	return fu(`${XDPApi}/pricings/packages/search?${stringify(params)}`);
}

export function instanceTypesListUrl(params) {
	return fu(`${XDPApi}/pricings/instance_types/search?${stringify(params)}`);
}

export function getAppointmentListUrl(params) {
	return fu(`${XDPApi}/demo_applications/list`, params);
}

export function fetchAppSettingUrl(key) {
	return fu(`${XDPApi}/app_settings/${key}`);
}

export function setAppSettingsUrl() {
	return fu(`${XDPApi}/app_settings`);
}

export function creditsRechargeUrl(orgId) {
	return fu(`${XDPApi}/balance/${orgId}/recharge`);
}

export function creditsDeductUrl(orgId) {
	return fu(`${XDPApi}/balance/${orgId}/deduct`);
}

export function getBalanceUrl(orgId) {
	return fu(`${XDPApi}/balance/${orgId}/balance`);
}

export function getBalanceListUrl(params) {
	return fu(`${XDPApi}/balance/list_balance`, params);
}

export function getBalanceDetailUrl(orgId, params) {
	return fu(`${XDPApi}/balance/${orgId}/balance_detail`, params);
}

export function getBalanceTotalUrl(params) {
	return fu(`${XDPApi}/balance/balance_total`, params);
}

export function downloadBillUrl(orgId, params) {
	return fu(`${XDPApi}/balance/${orgId}/json_report`, params);
}

export function fetchOpAccountListUrl(params) {
	return fu(`${XDPApi}/op_users`, params);
}

export function fetchOpAccountRoleListUrl(params) {
	return fu(`${XDPApi}/op_users/role`, params);
}

export function createOpAccountUrl(params) {
	return fu(`${XDPApi}/op_users`, params);
}

export function disableOpAccountUrl(userId, params) {
	return fu(`${XDPApi}/op_users/${userId}/disable`, params);
}

export function lockOpAccountUrl(userId, params) {
	return fu(`${XDPApi}/op_users/${userId}/lock`, params);
}

export function updateOpAccountUrl(userId, params) {
	return fu(`${XDPApi}/op_users/${userId}`, params);
}

export function resetOpAccountPasswordUrl(params) {
	return fu(`${XDPApi}/op_users/resetPwd`, params);
}

export function uploadOrgAttachmentUrl(orgId) {
	return fu(`${XDPApi}/attachments/to/org/${orgId}`);
}

export function fetchOrgAttachmentsUrl(orgId) {
	return fu(`${XDPApi}/attachments/org/${orgId}`);
}

export function deleteOrgAttachmentUrl(attachmentId) {
	return fu(`${XDPApi}/attachments/org/${attachmentId}`);
}

export function fetchIdentityListUrl() {
	return fu(`${XDPApi}/users/identities`);
}

export function uploadUserAttachmentsUrl(userId) {
	return fu(`${XDPApi}/attachments/to/user/${userId}`);
}

export function deleteUserAttachmentUrl(attachmentId) {
	return fu(`${XDPApi}/attachments/user/${attachmentId}`);
}

export function fetchDatasetsUrl(params) {
	return fu(`${DatasetApi}/op/datasets`, params);
}

export function fetchDatasetTagsUrl() {
	return fu(`${DatasetApi}/op/dataset/tags`);
}

export function deleteDatasetUrl(datasetId) {
	return fu(`${DatasetApi}/op/datasets/${datasetId}`);
}

export function fetchContainerRegistryUrl(params) {
	return fu(`${XDPApi}/registries/images`, params);
}

export function deleteContainerRegistryUrl(params) {
	return fu(`${XDPApi}/registries/images`, params);
}

export function fetchServiceListUrl(params) {
	return fu(`${FuwuApi}/operations/fuwus`, params);
}

export function fetchServiceUrl(serviceId) {
	return fu(`${FuwuApi}/fuwus/${serviceId}`);
}

export function downloadAttachmentUrl(attachmentId) {
	return fu(`${XDPApi}/attachments/${attachmentId}/json`);
}

export function fetchGpuTypeUrl() {
	return fu(`${PricingApi}/gpu_types`);
}

export function fetchInstanceTypeListUrl(params) {
	return fu(`${PricingApi}/all_instance_types`, params);
}

export function fetchInstanceTypeUrl(params) {
	return fu(`${PricingApi}/instance_types`, params);
}

export function createInstanceTypeUrl() {
	return fu(`${PricingApi}/instance_types`);
}

export function updateInstanceTypeUrl(id) {
	return fu(`${PricingApi}/instance_types/${id}`);
}

export function enableInstanceTypeUrl(id) {
	return fu(`${PricingApi}/instance_types/${id}/enable`);
}

export function disableInstanceTypeUrl(id) {
	return fu(`${PricingApi}/instance_types/${id}/disable`);
}
