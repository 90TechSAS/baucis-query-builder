'use strict';


describe('query builder service', function(){
    var qbServiceProvider, qbService, httpBackend;


    beforeEach(module('90TechSAS.baucis-query-builder', function(zlQueryBuilderProvider){
        qbServiceProvider = zlQueryBuilderProvider;
        qbServiceProvider.setRootApiPath('http://root/')
    }));


    beforeEach(inject(function(_zlQueryBuilder_, $httpBackend){
        qbService   = _zlQueryBuilder_.get('path');
        httpBackend = $httpBackend;
    }));

    afterEach(function(){httpBackend.verifyNoOutstandingExpectation()});


    it('should do nothing when passed nothing as argument', function(){
        qbService.paginate()
        .populate().select()
        .sort();
        expect(qbService.options).toEqual({});
    });


    it('should have access to query builder', function(){
        expect(qbService).toBeDefined();
    });

    it('should paginate', function(){
        qbService.paginate({skip: 10, limit: 10});
        expect(qbService.options).toEqual({skip: 10, limit: 10})
    });

    it('should sort', function(){
        qbService.sort('toto');
        expect(qbService.options).toEqual({sort: 'toto'})
    });

    it('should populate', function(){
        var populate = [{path: 'toto'}, {path: 'titi'}];
        qbService.populate(populate);
        expect(qbService.options).toEqual({populate: JSON.stringify(populate)})
    });

    it('should populate with string names', function(){
        var populate = [{path: 'toto'}, {path: 'titi'}];
        qbService.populate(['toto', 'titi']);
        expect(qbService.options).toEqual({populate: JSON.stringify(populate)})
    });

    it('should populate one element without array', function(){
        var populate = [{path: 'toto'}];
        qbService.populate('toto');
        expect(qbService.options).toEqual({populate: JSON.stringify(populate)})
    });

    it('should select', function(){
        var query = {conditions: [{_id: {$in: [1, 2, 3]}}]};
        qbService.select([1, 2, 3]);
        expect(qbService.options).toEqual(query);
    });

    it('should select on any column', function(){
        var query = {conditions: [{myColumn: {$in: [1, 2, 3]}}]};
        qbService.select([1, 2, 3], 'myColumn');
        expect(qbService.options).toEqual(query);
    });

    it('should echo', function(){
        console.log = jasmine.createSpy("log");
        qbService.sort('toto').echo();
        expect(console.log).toHaveBeenCalledWith({sort: 'toto'});
    });

    it('should chain all of the above', function(){
        console.log  = jasmine.createSpy("log");
        var populate = [{path: 'toto'}, {path: 'titi'}];
        qbService.paginate({skip: 10, limit: 10})
            .sort('toto')
            .populate(populate)
            .select([1, 2, 3])
            .select([1, 2, 3], 'myColumn')
            .echo();
        expect(console.log).toHaveBeenCalledWith({
            skip      : 10,
            limit     : 10,
            sort      : 'toto',
            populate  : '[{"path":"toto"},{"path":"titi"}]',
            conditions: [{
                _id     : {$in: [1, 2, 3]},
                myColumn: {$in: [1, 2, 3]}
            }]
        });
    });

    it('should get and flush', function(){
        httpBackend.expectGET('http://root/path').respond('');
        qbService.get();
        expect(qbService.options).toEqual({});
    });
    it('should get and keep', function(){
        httpBackend.expectGET('http://root/path').respond('');
        qbService.get(true);
        expect(qbService.options).toEqual({});
    });


    it('should get with many options', function(){
        httpBackend.expect('GET', 'http://root/path?conditions' +
            '=%7B%22_id%22:%7B%22$in%22:%5B1,2,3%5D%7D,%22myColumn%22:%7B%22$in%22:%5B1,2,3%5D%7D%7D' +
            '&limit=10' +
            '&populate=%5B%7B%22path%22:%22toto%22%7D,%7B%22path%22:%22titi%22%7D%5D' +
            '&skip=10' +
            '&sort=toto').respond('');
        var populate = [{path: 'toto'}, {path: 'titi'}];
        qbService.paginate({skip: 10, limit: 10})
            .sort('toto')
            .populate(populate)
            .select([1, 2, 3])
            .select([1, 2, 3], 'myColumn')
            .get();
    });

    it('should get Path', function(){
        expect(qbService.getPath()).toEqual('http://root/path');
    })


});