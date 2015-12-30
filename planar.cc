#include <node.h>
#include <v8.h>
#include <nan.h>
#include <string>
#include <vector>
#include <utility>
#include <stdlib.h>
#include <iostream>
#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/properties.hpp>
#include <boost/graph/graph_traits.hpp>
#include <boost/property_map/property_map.hpp>
#include <boost/graph/planar_canonical_ordering.hpp>
#include <boost/graph/is_straight_line_drawing.hpp>
#include <boost/graph/chrobak_payne_drawing.hpp>
#include <boost/graph/boyer_myrvold_planar_test.hpp>
#include <boost/graph/make_connected.hpp>
#include <boost/graph/make_biconnected_planar.hpp>
#include <boost/graph/make_maximal_planar.hpp>
#include <boost/graph/is_kuratowski_subgraph.hpp>
#include <boost/lexical_cast.hpp>

using namespace v8;
using namespace std;
using namespace boost;
using namespace Nan;

vector <pair <int, int> > v(0);
int nVertices;

struct coord_t{
  size_t x;
  size_t y;
};
struct face_counter : public planar_face_traversal_visitor{
  face_counter() : count(0) {}
  void begin_face() { ++count; }
  int count;
};
string getCords();

NAN_METHOD(sum) {
  NanScope();
  string s = getCords();
  NanReturnValue(s.c_str());
}

NAN_METHOD(add){
	NanScope();
	int nv1 = args[0]->Uint32Value();
	int nv2 = args[1]->Uint32Value();
	v.push_back(make_pair(nv1, nv2));
	NanReturnValue(NanNew<Number>(1));
}

NAN_METHOD(init){
	NanScope();
	v.clear();
	nVertices = args[0]->Uint32Value();
	NanReturnValue(NanNew<Number>(1));
}

void Init(Handle<Object> exports){
	exports->Set(NanNew<String>("initGraph"), NanNew<FunctionTemplate>(init)->GetFunction());
	exports->Set(NanNew<String>("sum"), NanNew<FunctionTemplate>(sum)->GetFunction());
	exports->Set(NanNew<String>("addEdge"), NanNew<FunctionTemplate>(add)->GetFunction());
}

NODE_MODULE(planar, Init);

string getCords(){
	typedef adjacency_list
		< vecS, vecS, undirectedS,
		property<vertex_index_t, int>,
		property<edge_index_t, int> > graph;
	typedef vector< vector< graph_traits<graph>::edge_descriptor > > embedding_storage_t;
	typedef boost::iterator_property_map <embedding_storage_t::iterator, 
		property_map<graph, vertex_index_t>::type> embedding_t;
	graph g(nVertices);
	for(unsigned int i = 0; i < v.size(); i++){
		add_edge(v[i].first, v[i].second, g);
	}
	make_connected(g);
	property_map<graph, edge_index_t>::type e_index = get(edge_index, g);
	graph_traits<graph>::edges_size_type edge_ctr = 0;
	graph_traits<graph>::edge_iterator ei, ei_end;
	for(tie(ei, ei_end) = edges(g); ei != ei_end; ++ei){
		put(e_index, *ei, edge_ctr++);
	}
	typedef vector< graph_traits<graph>::edge_descriptor > vec_t;
	vector<vec_t> embeddingT(num_vertices(g));
	bool isPlanar = boyer_myrvold_planarity_test(boyer_myrvold_params::graph = g,
	   											 boyer_myrvold_params::embedding = &embeddingT[0]);
	if(isPlanar){
		string output = "p-";
		make_biconnected_planar(g, &embeddingT[0]);
		edge_ctr = 0;
		for(tie(ei, ei_end) = edges(g); ei != ei_end; ++ei){
			put(e_index, *ei, edge_ctr++);
		}
		boyer_myrvold_planarity_test(boyer_myrvold_params::graph = g,
		   boyer_myrvold_params::embedding = &embeddingT[0]);
		make_maximal_planar(g, &embeddingT[0]);
		edge_ctr = 0;
		for(tie(ei, ei_end) = edges(g); ei != ei_end; ++ei){
			put(e_index, *ei, edge_ctr++);
		}
		embedding_storage_t embedding_storage(num_vertices(g));
		embedding_t embedding(embedding_storage.begin(), get(vertex_index,g));
		boyer_myrvold_planarity_test(boyer_myrvold_params::graph = g,
									 boyer_myrvold_params::embedding = embedding);
		vector<graph_traits<graph>::vertex_descriptor> ordering;
		planar_canonical_ordering(g, embedding, back_inserter(ordering));
		typedef vector< coord_t > straight_line_drawing_storage_t;
		typedef boost::iterator_property_map <straight_line_drawing_storage_t::iterator, 
			property_map<graph, vertex_index_t>::type>straight_line_drawing_t;
		straight_line_drawing_storage_t straight_line_drawing_storage (num_vertices(g));
		straight_line_drawing_t straight_line_drawing (straight_line_drawing_storage.begin(), get(vertex_index,g));
		chrobak_payne_straight_line_drawing(g, embedding, ordering.begin(),
			ordering.end(),straight_line_drawing);
		graph_traits<graph>::vertex_iterator vi, vi_end;
		for(tie(vi,vi_end) = vertices(g); vi != vi_end; ++vi){
			coord_t coord(get(straight_line_drawing,*vi));
			output += lexical_cast<string>(*vi) + "," + lexical_cast<string>(coord.x) + "," + lexical_cast<string>(coord.y) + "-";
		}
		return output;
	}else{
		string output = "k-";
		typedef std::vector< graph_traits<graph>::edge_descriptor > kuratowski_edges_t;
		kuratowski_edges_t kuratowski_edges;
		boyer_myrvold_planarity_test(boyer_myrvold_params::graph = g,
                                     boyer_myrvold_params::kuratowski_subgraph = back_inserter(kuratowski_edges));
		kuratowski_edges_t::iterator ki, ki_end;
        ki_end = kuratowski_edges.end();
        for(ki = kuratowski_edges.begin(); ki != ki_end; ++ki){
          output += lexical_cast<string>(*ki) + "-";
        }
        if(is_kuratowski_subgraph(g, kuratowski_edges.begin(), kuratowski_edges.end())){
        	return output;
        }
	}
	return "no";
}