import { IGoogleFontDisplay, IGoogleFontRequestFontItem, IGoogleFontSubset } from 'src/@types/google-fonts'
import { buildGoogleFontsUrl } from './build-google-fonts-url'
import { googleFontsBaseUrl } from '../constants/google-fonts-base-url'

describe('buildGoogleFontsUrl', () => {
    it('should build URL with font family', () => {
        const fonts: IGoogleFontRequestFontItem[] = [{ family: 'test' }, { family: 'other' }]

        const url = buildGoogleFontsUrl({ fonts })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,400')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,400')}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family and display', () => {
        const fonts: IGoogleFontRequestFontItem[] = [{ family: 'test' }, { family: 'other' }]
        const display: IGoogleFontDisplay[] = ['swap']

        const url = buildGoogleFontsUrl({ fonts, display })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,400')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,400')}`
            + '&'
            + 'display=swap'
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family and subset', () => {
        const fonts: IGoogleFontRequestFontItem[] = [{ family: 'test' }, { family: 'other' }]
        const subset: IGoogleFontSubset[] = ['cyrillic', 'greek']

        const url = buildGoogleFontsUrl({ fonts, subset })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,400')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,400')}`
            + '&'
            + `subset=${encodeURIComponent("cyrillic,greek")}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family and text', () => {
        const fonts: IGoogleFontRequestFontItem[] = [{ family: 'test' }, { family: 'other' }]
        const text = 'test'

        const url = buildGoogleFontsUrl({ fonts, text })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,400')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,400')}`
            + '&'
            + `text=${text}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family, display, subset, and text', () => {
        const fonts: IGoogleFontRequestFontItem[] = [{ family: 'test' }, { family: 'other' }]
        const display: IGoogleFontDisplay[] = ['swap']
        const subset: IGoogleFontSubset[] = ['cyrillic', 'greek']
        const text = 'test'

        const url = buildGoogleFontsUrl({ fonts, display, subset, text })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,400')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,400')}`
            + '&'
            + 'display=swap'
            + '&'
            + `subset=${encodeURIComponent("cyrillic,greek")}`
            + '&'
            + `text=${text}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family in italic', () => {
        const fonts: IGoogleFontRequestFontItem[] = [
            { family: 'test', style: 'italic' },
            { family: 'other', style: ['italic'] }
        ]

        const url = buildGoogleFontsUrl({ fonts })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,400;1,400')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,400;1,400')}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family in bold', () => {
        const fonts: IGoogleFontRequestFontItem[] = [
            { family: 'test', style: 'bold' },
            { family: 'other', style: ['bold'] }
        ]

        const url = buildGoogleFontsUrl({ fonts })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,700')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,700')}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family in specific weights', () => {
        const fonts: IGoogleFontRequestFontItem[] = [
            { family: 'test', weight: 500 },
            { family: 'other', weight: [700, 800] }
        ]

        const url = buildGoogleFontsUrl({ fonts })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,500')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,700;0,800')}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with font family in italic, bold, and specific weights', () => {
        const fonts: IGoogleFontRequestFontItem[] = [
            { family: 'test', style: ["italic", "bold"], weight: 500 },
            { family: 'other', style: ["italic", "bold"], weight: [500, 600] }
        ]

        const url = buildGoogleFontsUrl({ fonts })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,500;0,700;1,500;1,700')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700')}`
        expect(url).toBe(expectedUrl)
    })

    it('should build URL with all options available', () => {
        const fonts: IGoogleFontRequestFontItem[] = [
            { family: 'test', style: ["italic", "bold"], weight: 500 },
            { family: 'other', style: ["italic", "bold"], weight: [500, 600] }
        ]
        const display: IGoogleFontDisplay[] = ['swap']
        const subset: IGoogleFontSubset[] = ['cyrillic', 'greek']
        const text = 'test'

        const url = buildGoogleFontsUrl({ fonts, display, subset, text })

        const expectedUrl = googleFontsBaseUrl
            + '?'
            + `family=${encodeURIComponent('test:ital,wght@0,500;0,700;1,500;1,700')}`
            + '&'
            + `family=${encodeURIComponent('other:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700')}`
            + '&'
            + 'display=swap'
            + '&'
            + `subset=${encodeURIComponent("cyrillic,greek")}`
            + '&'
            + `text=${text}`

        expect(url).toBe(expectedUrl)
    })
})