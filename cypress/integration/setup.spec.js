describe('Initial test to ensure cypress is working', () => {
    it('Does not match', () => {
        expect(true).to.not.equal(false)
    })

    it('Does math', () => {
        expect(1+1).to.equal(2)
    })
})