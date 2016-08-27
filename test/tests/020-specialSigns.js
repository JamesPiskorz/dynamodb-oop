describe('special signs in attribute names', function () {
	it('insert attribute with "-" in name', function(done) {
		DynamoDB
			.table($tableName)
			.return( DynamoDB.ALL_NEW )
			.insert_or_update({
				hash: 'hash_with_minus',
				range: 1234,
				'account-id': "aaa",
				'non-key-attribute': 1
			}, function(err, data) {
				if (err)
					throw err

				assert.equal(data['account-id'],'aaa')
				done()
			})

	})

	it('query attributes with "-" sign in where()', function(done) {
		DynamoDB
			.table($tableName)
			.index('byAccount-Id')
			.descending()
			.where('account-id').eq( 'aaa' )
			.on('beforeRequest', function(op, payload) {
				//console.log(op, JSON.stringify(payload,null,"\t"))
			})
			.query(function(err, data ) {
				if (err)
					throw err

				assert.equal(data.length,1)
				assert.equal(data[0]['account-id'],'aaa')

				done()
			})
	})

	it('query attributes with "-" sign in filter()', function(done) {
		DynamoDB
			.table($tableName)
			.index('byAccount-Id')
			.descending()
			.where('account-id').eq( 'aaa' )
			.having('non-key-attribute').gt(0)
			.on('beforeRequest', function(op, payload) {
				//console.log(op, JSON.stringify(payload,null,"\t"))
			})
			.query(function(err, data ) {
				if (err)
					throw err

				assert.equal(data.length,1)
				assert.equal(data[0]['non-key-attribute'],1)
				done()
			})
	})
	it('query attributes with "-" sign in select()', function(done) {
		DynamoDB
			.table($tableName)
			.select("non-key-attribute")
			.index('byAccount-Id')
			.descending()
			.where('account-id').eq( 'aaa' )
			.on('beforeRequest', function(op, payload) {
				//console.log(op, JSON.stringify(payload,null,"\t"))
			})
			.query(function(err, data ) {
				if (err)
					throw err

				assert.equal(data.length,1)
				assert.equal(Object.keys(data[0]).length,1)
				assert.equal(data[0]['non-key-attribute'],1)
				done()
			})
	})
	// also in scan


	it('insert attribute with "." in name', function(done) {
		DynamoDB
			.table($tableName)
			.return( DynamoDB.ALL_NEW )
			.insert_or_update({
				hash: 'hash_with_dot',
				range: 1234,
				'account.id': "aaa",
				'non.key.attribute': 1
			}, function(err, data) {
				if (err)
					throw err

				assert.equal(data['account.id'],'aaa')
				done()
			})
	})

	//it('query attributes with "." sign in where()', function(done) {
	//	DynamoDB
	//		.table($tableName)
	//		.index('byAccount.Id')
	//		.descending()
	//		.where('account.id').eq( 'aaa' )
	//		.on('beforeRequest', function(op, payload) {
	//			console.log(op, JSON.stringify(payload,null,"\t"))
	//		})
	//		.query(function(err, data ) {
	//			if (err)
	//				throw err

	//			console.log(data)
	//			//assert.equal(data.length,1)
	//			//assert.equal(data[0]['account.id'],'aaa')

	//			done()
	//		})
	//})



	//it('should allow attributes with "-" sign in having', function(done) {

	//})
})
