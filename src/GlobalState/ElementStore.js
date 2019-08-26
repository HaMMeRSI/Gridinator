import Utils from '@/Utils'

export default {
	state: {
		Data: [
			{
				name: 'Common Elements',
				members: [
					{
						name: 'input',
						getObject() {
							return {
								name: 'input',
								vComponent: {
									template: '<input />'
								},
								attributes: {
									type: 'text'
								},
								id: Utils.uuid(),
								style: {
									height: '50%',
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'a',
						getObject() {
							return {
								name: 'a',
								vComponent: {
									template: '<a></a>'
								},
								innerHTML: {
									value: 'Enter link..'
								},
								attributes: {
									target: '_blank',
									href: 'https://www.google.com'
								},
								id: Utils.uuid(),
								style: {
									height: '50%',
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'label',
						getObject() {
							return {
								name: 'label',
								vComponent: {
									template: '<label></label>'
								},
								innerHTML: {
									value: 'Enter Text..'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'p',
						getObject() {
							return {
								name: 'p',
								vComponent: {
									template: '<p></p>'
								},
								innerHTML: {
									value: 'Enter Text..'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'button',
						getObject() {
							return {
								name: 'button',
								vComponent: {
									template: '<button></button>'
								},
								innerHTML: {
									value: 'Click Me:'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					}
				]
			},
			{
				name: 'Containers',
				members: [
					{
						name: 'grid',
						getObject() {
							const uuid = Utils.uuid();
							return {
								vComponent: 'grid',
								id: uuid,
								name: 'grid',
								style: {
									height: '100%',
									width: '100%'
								},
								attributes: {
									id: uuid,
									columns: 4,
									rows: 4,
									editMode: true
								},
								areas: [],
								children: []
							}
						}
					},
					{
						name: 'article',
						getObject() {
							return {
								name: 'article',
								vComponent: {
									template: '<article>Enter article..</article>'
								},
								innerHTML: {
									value: 'Enter article..'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'dialog',
						getObject() {
							return {
								name: 'dialog',
								vComponent: {
									template: '<dialog></dialog>'
								},
								innerHTML: {
									value: 'Enter dialog..'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'aside',
						getObject() {
							return {
								name: 'aside',
								vComponent: {
									template: '<aside></aside>'
								},
								innerHTML: {
									value: 'aside..'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'header',
						getObject() {
							return {
								name: 'header',
								vComponent: {
									template: '<header></header>'
								},
								innerHTML: {
									value: 'header..'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'footer',
						getObject() {
							return {
								name: 'footer',
								vComponent: {
									template: '<footer></footer>'
								},
								innerHTML: {
									value: 'footer..'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'iframe',
						getObject() {
							return {
								name: 'iframe',
								vComponent: {
									template: '<iframe></iframe>'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					}
				]
			},
			{
				name: 'Headings',
				members: [
					{
						name: 'h1',
						getObject() {
							return {
								name: 'h1',
								vComponent: {
									template: '<h1></h1>'
								},
								innerHTML: {
									value: 'Title'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'h2',
						getObject() {
							return {
								name: 'h2',
								vComponent: {
									template: '<h2></h2>'
								},
								innerHTML: {
									value: 'Title'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'h3',
						getObject() {
							return {
								name: 'h3',
								vComponent: {
									template: '<h3></h3>'
								},
								innerHTML: {
									value: 'Title'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'h4',
						getObject() {
							return {
								name: 'h4',
								vComponent: {
									template: '<h4></h4>'
								},
								innerHTML: {
									value: 'Title'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'h5',
						getObject() {
							return {
								name: 'h5',
								vComponent: {
									template: '<h5></h5>'
								},
								innerHTML: {
									value: 'Title'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'h6',
						getObject() {
							return {
								name: 'h6',
								vComponent: {
									template: '<h6></h6>'
								},
								innerHTML: {
									value: 'Title'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					}
				]
			},
			{
				name: 'More Elements',
				members: [
					// {
					// 	name: 'img',
					// 	getObject() {
					// 		return {
					// 			name: 'img',
					// 			vComponent: {
					// 				template: '<img />'
					// 			},
					// 			attributes: {

					// 			},
					// 			id: Utils.uuid(),
					// 			style: {
					// 				alignSelf: 'center',
					// 				justifySelf: 'center',
					// 				height: '100%',
					// 				width: '100%',
					// 				backgroundImage: 'url(static/image.png)',
					// 				backgroundSize: '100% 100%'
					// 			}
					// 		}
					// 	}
					// },
					{
						name: 'img',
						getObject() {
							return {
								name: 'img',
								vComponent: {
									template: '<img />'
								},
								attributes: {
									src: 'static/image.png'
								},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center',
									height: '100%',
									width: '100%',
									backgroundSize: '100% 100%'
								}
							}
						}
					},
					{
						name: 'audio',
						getObject() {
							return {
								name: 'audio',
								vComponent: {
									template: '<audio></audio>'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					},
					{
						name: 'video',
						getObject() {
							return {
								name: 'video',
								vComponent: {
									template: '<video></video>'
								},
								attributes: {},
								id: Utils.uuid(),
								style: {
									alignSelf: 'center',
									justifySelf: 'center'
								}
							}
						}
					}
				]
			}
			// DO NOT DELETE IT!!!!!!!!!!!!!!!!!!
			// ,
			// {
			// 	name: 'Custom Component',
			// 	members: [
			// 		{
			// 			name: 'testc',
			// 			getObject() {
			// 				return {
			// 					vComponent: require('@/components/Layout/customComponents/test'),
			// 					id: Utils.uuid(),
			// 					style: {
			// 						height: '100%',
			// 						width: '100%'
			// 					}
			// 				}
			// 			}
			// 		}
			// 	]
			// }
		]
	}
}
