import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery; //like StudentModel,UserModel
    this.query = query;
  }

  //search Method
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }

  //Filter Method
  filter() {
    const queryObj = { ...this.query }; //searchTerm bad e sob thakbe
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    //console.log({ query }, { queryObj });
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
    }
    
    //sort Method
    sort() {
        const sort = this?.query?.sort || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }
}
